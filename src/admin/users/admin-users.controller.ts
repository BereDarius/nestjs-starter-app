import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { FindOptionsWhere } from 'typeorm';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { QueryUserDto } from 'src/users/dto/query-user.dto';
import { RoleEnum } from 'src/auth/enums/roles.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { Users } from 'src/users/entities/users.entity';
import { UsersService } from 'src/users/users.service';

@ApiTags('Users')
@Roles(RoleEnum.ADMIN)
@UseGuards(JwtGuard)
@ApiBearerAuth()
@Controller('admin/users')
export class AdminUsersController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  async checkUserExists(id: string) {
    const user = await this.usersService.findOne(id);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  @Post()
  @ApiResponse({ status: HttpStatus.CREATED, description: 'User created' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Get()
  @ApiResponse({ status: HttpStatus.OK, description: 'Users found' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
  findAll(@Query() query: QueryUserDto) {
    const where: FindOptionsWhere<Users> = query;

    return this.usersService.findAll(where);
  }

  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'User found' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  async findOne(@Param('id') id: string) {
    const user = await this.checkUserExists(id);

    return user;
  }

  @Patch(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'User updated' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    await this.checkUserExists(id);

    const result = await this.usersService.update(id, updateUserDto);

    return result;
  }

  @Delete(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'User deleted' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  async remove(@Param('id') id: string) {
    await this.checkUserExists(id);

    const result = await this.usersService.remove(id);

    return result;
  }
}

import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { FindOptionsWhere } from 'typeorm';
import { JwtGuard } from './guards/jwt.guard';
import { LocalGuard } from './guards/local.guard';
import { LoginDto } from './dto/login.dto';
import { Request } from 'express';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { Users } from 'src/users/entities/users.entity';
import { UsersService } from 'src/users/users.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('login')
  @UseGuards(LocalGuard)
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'User logged in' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  async login(@Req() request) {
    return request.user;
  }

  @Post('register')
  @ApiResponse({ status: HttpStatus.CREATED, description: 'User registered' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'Conflict' })
  async register(@Req() request, @Body() createUserDto: CreateUserDto) {
    if (request.user) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    const where: FindOptionsWhere<Users>[] = [
      { username: createUserDto.username },
      { email: createUserDto.username },
    ];

    const foundUsers = await this.usersService.findAll(where);
    const foundUser = foundUsers[0];

    if (foundUser[0]) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    return this.authService.register(createUserDto);
  }

  @Get('me')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User found',
  })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  async me(@Req() request: Request) {
    return request.user;
  }

  @Patch('me')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User updated',
  })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  async update(@Req() request, @Body() updateUserDto: UpdateUserDto) {
    return this.authService.update(request.user.id, updateUserDto);
  }

  @Delete('me')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User deleted',
  })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  async delete(@Req() request) {
    return this.usersService.remove(request.user.id);
  }
}

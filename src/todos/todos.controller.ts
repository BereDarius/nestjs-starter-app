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
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { FindOptionsWhere } from 'typeorm';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { QueryTodoDto } from './dto/query-todo.dto';
import { RoleEnum } from 'src/auth/enums/roles.enum';
import { RoleGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Todos } from './entities/todo.entity';
import { TodosService } from './todos.service';
import { UpdateTodoDto } from './dto/update-todo.dto';

@ApiTags('Todos')
@Controller('todos')
@UseGuards(JwtGuard)
@ApiBearerAuth()
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  async getTodoOwnership(request, id) {
    const { user } = request;

    const todo = await this.todosService.findOne(id);

    if (!todo) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    if (todo.user_id !== user.id && user.role !== RoleEnum.MODERATOR) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    return todo;
  }

  @Post()
  @Roles(RoleEnum.USER, RoleEnum.MODERATOR)
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Todo created' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
  create(@Req() request, @Body() createTodoDto: CreateTodoDto) {
    const { user } = request;

    if (user.role !== RoleEnum.ADMIN && user.role !== RoleEnum.MODERATOR) {
      createTodoDto.user_id = user.id;
    }

    return this.todosService.create(createTodoDto);
  }

  @Get()
  @Roles(RoleEnum.USER, RoleEnum.MODERATOR)
  @UseGuards(RoleGuard)
  @ApiResponse({ status: HttpStatus.OK, description: 'Todos found' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
  findAll(@Req() request, @Query() query: QueryTodoDto) {
    const { user } = request;

    const where: FindOptionsWhere<Todos> = {
      user_id: user.id,
      ...query,
    };

    return this.todosService.findAll(where);
  }

  @Get(':id')
  @Roles(RoleEnum.USER, RoleEnum.MODERATOR)
  @ApiResponse({ status: HttpStatus.OK, description: 'Todo found' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not Found' })
  async findOne(@Req() request, @Param('id') id: string) {
    const todo = await this.getTodoOwnership(request, id);

    return todo;
  }

  @Patch(':id')
  @Roles(RoleEnum.USER, RoleEnum.MODERATOR)
  @ApiResponse({ status: HttpStatus.OK, description: 'Todo updated' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not Found' })
  async update(@Req() request, @Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    await this.getTodoOwnership(request, id);

    return this.todosService.update(id, updateTodoDto);
  }

  @Delete(':id')
  @Roles(RoleEnum.USER, RoleEnum.MODERATOR)
  @ApiResponse({ status: HttpStatus.OK, description: 'Todo removed' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not Found' })
  async remove(@Req() request, @Param('id') id: string) {
    await this.getTodoOwnership(request, id);

    return this.todosService.remove(id);
  }
}

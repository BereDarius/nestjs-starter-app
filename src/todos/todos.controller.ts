import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  HttpException,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleEnum } from 'src/auth/enums/roles.enum';
import { RoleGuard } from 'src/auth/guards/roles.guard';

@Controller('todos')
@UseGuards(JwtGuard)
@ApiBearerAuth()
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  async getTodoOwnership(request, id) {
    const { user } = request;

    const todo = await this.todosService.findOne(id);

    if (!todo) {
      throw new HttpException('Not Found', 404);
    }

    if (
      todo.user_id !== user.id &&
      (user.role !== RoleEnum.ADMIN || user.role !== RoleEnum.MODERATOR)
    ) {
      throw new HttpException('Forbidden', 403);
    }

    return todo;
  }

  @Post()
  @Roles(RoleEnum.USER, RoleEnum.MODERATOR)
  @ApiResponse({
    status: 201,
    description: 'Todo created',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
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
  @ApiResponse({ status: 200, description: 'Todos found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  findAll(@Req() request) {
    const { user } = request;

    if (user.role === RoleEnum.ADMIN || user.role === RoleEnum.MODERATOR) {
      return this.todosService.findAll(undefined);
    }

    return this.todosService.findAll(user.id);
  }

  @Get(':id')
  @Roles(RoleEnum.USER, RoleEnum.MODERATOR)
  @ApiResponse({ status: 200, description: 'Todo found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  async findOne(@Req() request, @Param('id') id: string) {
    const todo = await this.getTodoOwnership(request, id);

    return todo;
  }

  @Patch(':id')
  @Roles(RoleEnum.USER, RoleEnum.MODERATOR)
  @ApiResponse({ status: 200, description: 'Todo updated' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  async update(
    @Req() request,
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
    await this.getTodoOwnership(request, id);

    return this.todosService.update(id, updateTodoDto);
  }

  @Delete(':id')
  @Roles(RoleEnum.USER, RoleEnum.MODERATOR)
  @ApiResponse({ status: 200, description: 'Todo removed' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  async remove(@Req() request, @Param('id') id: string) {
    await this.getTodoOwnership(request, id);

    return this.todosService.remove(id);
  }
}

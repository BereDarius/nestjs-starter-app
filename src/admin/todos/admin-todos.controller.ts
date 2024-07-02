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
import { CreateTodoDto } from 'src/todos/dto/create-todo.dto';
import { FindOptionsWhere } from 'typeorm';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { QueryTodoDto } from 'src/todos/dto/query-todo.dto';
import { RoleEnum } from 'src/auth/enums/roles.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Todos } from 'src/todos/entities/todo.entity';
import { TodosService } from 'src/todos/todos.service';
import { UpdateTodoDto } from 'src/todos/dto/update-todo.dto';

@ApiTags('Todos')
@Roles(RoleEnum.ADMIN)
@UseGuards(JwtGuard)
@ApiBearerAuth()
@Controller('admin/todos')
export class AdminTodosController {
  constructor(private readonly todosService: TodosService) {}

  async checkTodoExists(id: string) {
    const todo = await this.todosService.findOne(id);

    if (!todo) {
      throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
    }

    return todo;
  }

  @Post()
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Todo created' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todosService.create(createTodoDto);
  }

  @Get()
  @ApiResponse({ status: HttpStatus.OK, description: 'Todos found' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
  findAll(@Query() query: QueryTodoDto) {
    const where: FindOptionsWhere<Todos> = query;

    return this.todosService.findAll(where);
  }

  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Todo found' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Todo not found' })
  async findOne(@Param('id') id: string) {
    const todo = await this.checkTodoExists(id);

    return todo;
  }

  @Patch(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Todo updated' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Todo not found' })
  async update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    await this.checkTodoExists(id);

    const result = this.todosService.update(id, updateTodoDto);

    return result;
  }

  @Delete(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Todo deleted' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Todo not found' })
  async remove(@Param('id') id: string) {
    await this.checkTodoExists(id);

    const result = this.todosService.remove(id);

    return result;
  }
}

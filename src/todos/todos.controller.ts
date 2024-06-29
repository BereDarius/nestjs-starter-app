import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { AccessGuard, Actions, UseAbility } from 'nest-casl';
import { Todos } from './entities/todo.entity';

@Controller('todos')
@UseGuards(JwtGuard, AccessGuard)
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  @UseAbility(Actions.create, Todos)
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todosService.create(createTodoDto);
  }

  @Get()
  @UseAbility(Actions.read, Todos)
  findAll() {
    return this.todosService.findAll();
  }

  @Get(':id')
  @UseAbility(Actions.read, Todos)
  findOne(@Param('id') id: string) {
    return this.todosService.findOne(+id);
  }

  @Patch(':id')
  @UseAbility(Actions.update, Todos)
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todosService.update(+id, updateTodoDto);
  }

  @Delete(':id')
  @UseAbility(Actions.delete, Todos)
  remove(@Param('id') id: string) {
    return this.todosService.remove(+id);
  }
}

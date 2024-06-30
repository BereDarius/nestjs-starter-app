import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Todos } from './entities/todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todos) private todosRepository: Repository<Todos>,
  ) {}

  create(createTodoDto: CreateTodoDto) {
    return this.todosRepository.save(createTodoDto);
  }

  findAll(user_id: string | undefined) {
    if (user_id) {
      return this.todosRepository.find({ where: { user_id } });
    }

    return this.todosRepository.find();
  }

  findOne(id: string) {
    return this.todosRepository.findOne({ where: { id } });
  }

  async update(id: string, updateTodoDto: UpdateTodoDto) {
    return this.todosRepository.save({ id, ...updateTodoDto });
  }

  remove(id: string) {
    return this.todosRepository.delete({ id });
  }
}
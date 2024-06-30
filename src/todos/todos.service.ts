import { CreateTodoDto } from './dto/create-todo.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todos } from './entities/todo.entity';
import { UpdateTodoDto } from './dto/update-todo.dto';

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

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

  findAll(userId: string | undefined) {
    if (userId) {
      return this.todosRepository.find({ where: { user_id: userId } });
    }

    return this.todosRepository.find();
  }

  findOne(id: string) {
    return this.todosRepository.findOne({ where: { id } });
  }

  update(id: string, updateTodoDto: UpdateTodoDto) {
    return this.todosRepository.save({ id, ...updateTodoDto });
  }

  remove(id: string) {
    return this.todosRepository.delete({ id });
  }
}

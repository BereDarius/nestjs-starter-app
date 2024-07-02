import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todos } from './entities/todo.entity';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
  constructor(@InjectRepository(Todos) private todosRepository: Repository<Todos>) {}

  create(createTodoDto: CreateTodoDto): Promise<Todos> {
    return this.todosRepository.save(createTodoDto);
  }

  findAll(where: FindOptionsWhere<Todos> | FindOptionsWhere<Todos>[]): Promise<Todos[]> {
    return this.todosRepository.find({ where });
  }

  findOne(id: string): Promise<Todos> {
    return this.todosRepository.findOne({ where: { id } });
  }

  update(id: string, updateTodoDto: UpdateTodoDto): Promise<Todos> {
    return this.todosRepository.save({ id, ...updateTodoDto });
  }

  remove(id: string) {
    return this.todosRepository.delete(id);
  }
}

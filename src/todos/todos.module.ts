import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todos } from './entities/todo.entity';
import { TodoStatus } from './entities/todo-status.entity';
import { CaslModule } from 'nest-casl';
import { permissions } from './permissions/todos.permissions';

@Module({
  imports: [
    TypeOrmModule.forFeature([Todos, TodoStatus]),
    CaslModule.forFeature({ permissions }),
  ],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}

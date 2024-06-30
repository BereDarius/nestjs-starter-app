import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todos } from './entities/todo.entity';
import { TodoStatus } from './entities/todo-status.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Todos, TodoStatus]), AuthModule],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}

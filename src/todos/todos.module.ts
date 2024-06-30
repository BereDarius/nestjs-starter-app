import { AuthModule } from 'src/auth/auth.module';
import { Module } from '@nestjs/common';
import { Todos } from './entities/todo.entity';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { TodoStatus } from './entities/todo-status.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Todos, TodoStatus]), AuthModule],
  controllers: [TodosController],
  providers: [TodosService],
  exports: [TodosService],
})
export class TodosModule {}

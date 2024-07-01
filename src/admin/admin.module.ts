import { AdminTodosController } from './todos/admin-todos.controller';
import { AdminUsersController } from './users/admin-users.controller';
import { AuthModule } from 'src/auth/auth.module';
import { Module } from '@nestjs/common';
import { TodosModule } from 'src/todos/todos.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [AuthModule, UsersModule, TodosModule],
  controllers: [AdminUsersController, AdminTodosController],
})
export class AdminModule {}

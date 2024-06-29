import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { Roles } from '../auth/entities/roles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Roles])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}

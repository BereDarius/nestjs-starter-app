import { Module } from '@nestjs/common';
import { Roles } from '../auth/entities/roles.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Roles])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}

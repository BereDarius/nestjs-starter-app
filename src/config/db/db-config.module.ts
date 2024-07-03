import { dbConfig } from './db.config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRootAsync(dbConfig)],
})
export class DatabaseConfigModule {}

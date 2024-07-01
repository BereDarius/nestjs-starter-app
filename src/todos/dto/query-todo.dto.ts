import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TodoStatusEnum } from '../enums/todo-status.enum';
import { Transform } from 'class-transformer';

export class QueryTodoDto {
  @ApiProperty({ required: false, example: 'Title' })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.trim())
  title?: string;

  @ApiProperty({ required: false, example: 'Description' })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.trim())
  description?: string;

  @ApiProperty({ required: false, example: '2024-06-29' })
  @IsOptional()
  @IsDateString()
  @Transform(({ value }) => new Date(value))
  due_date?: Date;

  @ApiProperty({
    required: false,
    example: 'PENDING',
    enum: TodoStatusEnum,
  })
  @IsOptional()
  @IsEnum(TodoStatusEnum)
  @Transform(({ value }) => value.trim().toUpperCase())
  status?: string;
}

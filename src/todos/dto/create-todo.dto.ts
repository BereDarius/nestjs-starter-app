import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TodoStatusEnum } from '../enums/todo-status.enum';
import { Transform } from 'class-transformer';

export class CreateTodoDto {
  @ApiProperty({ example: 'Title' })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  @Transform(({ value }) => value.trim())
  title: string;

  @ApiProperty({ example: 'Description' })
  @IsString()
  @Transform(({ value }) => value.trim())
  description: string;

  @ApiProperty({ example: '2024-06-29' })
  @IsDateString()
  @Transform(({ value }) => new Date(value))
  due_date: Date;

  @ApiProperty({
    example: 'PENDING',
    enum: TodoStatusEnum,
  })
  @IsEnum(TodoStatusEnum)
  @Transform(({ value }) => value.trim().toUpperCase())
  status: string;

  @IsUUID()
  user_id: string;
}

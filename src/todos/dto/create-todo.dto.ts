import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { TodoStatusEnum } from '../enums/todo-status.enum';

export class CreateTodoDto {
  @ApiProperty({ example: 'Title' })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  title: string;

  @ApiProperty({ example: 'Description' })
  @IsString()
  description: string;

  @ApiProperty({ example: '2024-06-29' })
  @IsDateString()
  due_date: Date;

  @ApiProperty({
    example: 'PENDING',
    enum: [
      TodoStatusEnum.PENDING,
      TodoStatusEnum.IN_PROGRESS,
      TodoStatusEnum.COMPLETED,
      TodoStatusEnum.ON_HOLD,
      TodoStatusEnum.CANCELLED,
      TodoStatusEnum.OVERDUE,
    ],
  })
  @IsString()
  status: string;

  user_id: string;
}

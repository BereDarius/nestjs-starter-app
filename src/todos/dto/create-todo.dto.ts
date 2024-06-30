import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

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
  due_date: Date;

  @ApiProperty({ example: 'PENDING' })
  status: string;

  user_id: string;
}

import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  IsEmail,
} from 'class-validator';
import { RoleEnum } from 'src/auth/enums/roles.enum';

export class CreateUserDto {
  @ApiProperty({ example: 'John' })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  first_name: string;

  @ApiProperty({ example: 'Doe' })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  last_name: string;

  @ApiProperty({ example: 'JohnDoe' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ example: 'john.doe@email.com' })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password' })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password: string;

  @ApiProperty({ example: 'USER', enum: RoleEnum })
  @IsEnum(RoleEnum)
  role?: string;
}

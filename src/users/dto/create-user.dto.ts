import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RoleEnum } from 'src/auth/enums/roles.enum';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @ApiProperty({ example: 'John' })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  @Transform(({ value }) => value.trim())
  first_name: string;

  @ApiProperty({ example: 'Doe' })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  @Transform(({ value }) => value.trim())
  last_name: string;

  @ApiProperty({ example: 'JohnDoe' })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  @Transform(({ value }) => value.trim())
  username: string;

  @ApiProperty({ example: 'john.doe@email.com' })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @Transform(({ value }) => value.trim().toLowerCase())
  email: string;

  @ApiProperty({ example: 'Password123@' })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @IsStrongPassword()
  password: string;

  @ApiProperty({ example: 'USER', enum: RoleEnum })
  @IsEnum(RoleEnum)
  @Transform(({ value }) => value.trim().toUpperCase())
  role?: string;
}

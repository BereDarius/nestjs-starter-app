import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RoleEnum } from 'src/auth/enums/roles.enum';
import { Transform } from 'class-transformer';

export class QueryUserDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.trim())
  first_name?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.trim())
  last_name?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.trim())
  username?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsEmail()
  @Transform(({ value }) => value.trim().toLowerCase())
  email?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsStrongPassword()
  password?: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(RoleEnum)
  @Transform(({ value }) => value.trim().toUpperCase())
  role?: string;
}

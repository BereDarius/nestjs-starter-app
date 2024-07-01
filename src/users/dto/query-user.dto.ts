import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RoleEnum } from 'src/auth/enums/roles.enum';
import { Transform } from 'class-transformer';

export class QueryUserDto {
  @ApiProperty({ required: false, example: 'John' })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.trim())
  first_name?: string;

  @ApiProperty({ required: false, example: 'Doe' })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.trim())
  last_name?: string;

  @ApiProperty({ required: false, example: 'JohnDoe' })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.trim())
  username?: string;

  @ApiProperty({ required: false, example: 'john.doe@email.com' })
  @IsOptional()
  @IsString()
  @IsEmail()
  @Transform(({ value }) => value.trim().toLowerCase())
  email?: string;

  @ApiProperty({ required: false, example: 'USER', enum: RoleEnum })
  @IsOptional()
  @IsEnum(RoleEnum)
  @Transform(({ value }) => value.trim().toUpperCase())
  role?: string;
}

import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { Request } from 'express';
import { JwtGuard } from './guards/jwt.guard';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('login')
  @UseGuards(LocalGuard)
  @ApiBody({ type: LoginDto })
  async login(@Req() request) {
    return request.user;
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const foundUser = await this.usersService.findOne(createUserDto.username);

    if (foundUser) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    return this.authService.register(createUserDto);
  }

  @Get('me')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  async me(@Req() request: Request) {
    return request.user;
  }
}

import { ApiBearerAuth, ApiBody, ApiResponse } from '@nestjs/swagger';
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
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { JwtGuard } from './guards/jwt.guard';
import { LocalGuard } from './guards/local.guard';
import { LoginDto } from './dto/login.dto';
import { Request } from 'express';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('login')
  @UseGuards(LocalGuard)
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    description: 'User logged in',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async login(@Req() request) {
    return request.user;
  }

  @Post('register')
  @ApiResponse({
    status: 201,
    description: 'User registered',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async register(@Req() request, @Body() createUserDto: CreateUserDto) {
    if (request.user) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    const foundUser = await this.usersService.findOne(createUserDto.username);

    if (foundUser) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    return this.authService.register(createUserDto);
  }

  @Get('me')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'User found',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async me(@Req() request: Request) {
    return request.user;
  }
}

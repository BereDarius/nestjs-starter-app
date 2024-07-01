import { encrypt, matchPassword } from 'src/lib/password-helpers';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { FindOptionsWhere } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { Users } from 'src/users/entities/users.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(loginDto: LoginDto) {
    const where: FindOptionsWhere<Users>[] = [
      {
        username: loginDto.username,
      },
      { email: loginDto.username },
    ];

    const foundUsers = await this.usersService.findAll(where);
    const foundUser = foundUsers[0];

    if (!foundUser) {
      return null;
    }

    const isPasswordMatching = await matchPassword(
      foundUser.password,
      loginDto.password,
    );

    if (!isPasswordMatching) {
      return null;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = foundUser;

    return {
      ...user,
      access_token: this.jwtService.sign(user),
    };
  }

  async register(createUserDto: CreateUserDto) {
    const hashedPassword = await encrypt(createUserDto.password);

    const user = {
      ...createUserDto,
      password: hashedPassword,
    };

    const newUser = await this.usersService.create(user);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = newUser;

    return {
      ...result,
      access_token: this.jwtService.sign(result),
    };
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const updateUserDtoCopy = { ...updateUserDto };

    if (updateUserDto.password) {
      updateUserDtoCopy.password = await encrypt(updateUserDto.password);
    }

    return this.usersService.update(id, updateUserDtoCopy);
  }
}

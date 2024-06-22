import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

const fakeUsers = [
  {
    id: '1',
    username: 'admin',
    password: 'admin',
  },
  {
    id: '2',
    username: 'user',
    password: 'user',
  },
];

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  validateUser(loginDto: LoginDto) {
    const foundUser = fakeUsers.find(
      (user) => user.username === loginDto.username,
    );

    if (!foundUser) {
      return null;
    }

    if (foundUser.password === loginDto.password) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...user } = foundUser;

      return this.jwtService.sign(user);
    }
  }
}

import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  create(createUserDto: CreateUserDto): Promise<Users> {
    return this.usersRepository.save(createUserDto);
  }

  findAll(where: FindOptionsWhere<Users> | FindOptionsWhere<Users>[]): Promise<Users[]> {
    return this.usersRepository.find({ where });
  }

  findOne(id: string): Promise<Users> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<Partial<Users>> {
    const updatedUser = await this.usersRepository.save({
      id,
      ...updateUserDto,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = updatedUser;

    return user;
  }

  delete(id: string) {
    return this.usersRepository.delete(id);
  }
}

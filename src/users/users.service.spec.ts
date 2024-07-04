import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/users.entity';
import { UsersService } from './users.service';

const mockUser = {
  first_name: 'John',
  last_name: 'Doe',
  username: 'JohnDoe',
  email: 'john.doe@email.com',
  password: 'Password123@',
};

describe('UsersService', () => {
  let usersService: UsersService;
  let mockRepository: Partial<Record<keyof Repository<Users>, jest.Mock>>;

  beforeEach(async () => {
    mockRepository = {
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(Users),
          useValue: mockRepository,
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  describe('create', () => {
    it('should successfully insert a user', async () => {
      const createUserDto = mockUser;
      mockRepository.save.mockResolvedValue(createUserDto);
      expect(await usersService.create(createUserDto)).toEqual(createUserDto);
      expect(mockRepository.save).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const usersArray = [mockUser];
      mockRepository.find.mockResolvedValue(usersArray);
      expect(await usersService.findAll({})).toEqual(usersArray);
      expect(mockRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single user', async () => {
      const user = mockUser;
      mockRepository.findOne.mockResolvedValue(user);
      expect(await usersService.findOne('1')).toEqual(user);
      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const updateUserDto = mockUser;
      const user = { id: '1', ...updateUserDto };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...updatedUser } = user;
      mockRepository.save.mockResolvedValue(updatedUser);
      expect(await usersService.update('1', updateUserDto)).toEqual(updatedUser);
      expect(mockRepository.save).toHaveBeenCalledWith({ id: '1', ...updateUserDto });
    });
  });
});

import { HttpException, HttpStatus } from '@nestjs/common';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';
import { Test, TestingModule } from '@nestjs/testing';
import { AdminUsersController } from './admin-users.controller';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';

const moduleMocker = new ModuleMocker(global);

const mockUser = {
  first_name: 'John',
  last_name: 'Doe',
  username: 'JohnDoe',
  email: 'john.doe@email.com',
};

const mockCreateUser = {
  first_name: 'John',
  last_name: 'Doe',
  username: 'JohnDoe',
  email: 'john.doe@email.com',
  password: 'Password123@',
};

describe('AdminUsersController', () => {
  let adminUsersController: AdminUsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminUsersController],
    })
      .useMocker(token => {
        if (token === AuthService) {
          return {
            register: jest.fn().mockResolvedValue(mockUser),
          };
        }

        if (token === UsersService) {
          return {
            findOne: jest.fn(id => {
              if (id === '1') {
                return mockUser;
              }
              return null;
            }),
            findAll: jest.fn(where => {
              if (where.username === 'test') {
                return [mockUser];
              }
              return [];
            }),
            update: jest.fn().mockResolvedValue(mockUser),
            delete: jest.fn().mockResolvedValue({}),
          };
        }

        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(token) as MockFunctionMetadata<any, any>;
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);
          return new Mock();
        }
      })
      .compile();

    adminUsersController = module.get<AdminUsersController>(AdminUsersController);
  });

  it('should be defined', () => {
    expect(adminUsersController).toBeDefined();
  });

  describe('checkUserExists', () => {
    it('should return a user', async () => {
      const result = await adminUsersController.checkUserExists('1');

      expect(result).toEqual(mockUser);
    });

    it('should throw an error if user does not exist', async () => {
      await expect(adminUsersController.checkUserExists('2')).rejects.toThrow(
        new HttpException('User not found', HttpStatus.NOT_FOUND),
      );
    });
  });

  describe('create', () => {
    it('should create a user', async () => {
      const result = await adminUsersController.create(mockCreateUser);

      expect(result).toEqual(mockUser);
    });
  });

  describe('findAll', () => {
    it('should return users', async () => {
      const result = await adminUsersController.findAll({ username: 'test' });

      expect(result).toEqual([mockUser]);
    });
  });

  describe('findOne', () => {
    it('should return a user', async () => {
      const result = await adminUsersController.findOne('1');

      expect(result).toEqual(mockUser);
    });

    it('should throw an error if user does not exist', async () => {
      await expect(adminUsersController.findOne('2')).rejects.toThrow(
        new HttpException('User not found', HttpStatus.NOT_FOUND),
      );
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const result = await adminUsersController.update('1', mockUser);

      expect(result).toEqual(mockUser);
    });

    it('should throw an error if user does not exist', async () => {
      await expect(adminUsersController.update('2', mockUser)).rejects.toThrow(
        new HttpException('User not found', HttpStatus.NOT_FOUND),
      );
    });
  });

  describe('delete', () => {
    it('should delete a user', async () => {
      const result = await adminUsersController.delete('1');

      expect(result).toEqual({});
    });

    it('should throw an error if user does not exist', async () => {
      await expect(adminUsersController.delete('2')).rejects.toThrow(
        new HttpException('User not found', HttpStatus.NOT_FOUND),
      );
    });
  });
});

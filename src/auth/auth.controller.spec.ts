import { HttpException, HttpStatus } from '@nestjs/common';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';

const moduleMocker = new ModuleMocker(global);

const mockUser = {
  first_name: 'First',
  last_name: 'Last',
  username: 'test',
  email: 'test',
};

const mockCreateUser = {
  first_name: 'First',
  last_name: 'Last',
  username: 'new',
  email: 'new',
  password: 'test',
};

const mockCreateUserAlreadyExists = {
  first_name: 'First',
  last_name: 'Last',
  username: 'test',
  email: 'test',
  password: 'test',
};

describe('AuthController', () => {
  let authController: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
    })
      .useMocker(token => {
        if (token === AuthService) {
          return {
            register: jest.fn().mockResolvedValue(mockUser),
            update: jest.fn().mockResolvedValue(mockUser),
          };
        }

        if (token === UsersService) {
          return {
            findAll: jest.fn(where => {
              if (where[0].username === 'test') {
                return [{ id: '1', username: 'test' }];
              }
              return [];
            }),
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

    authController = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('register', () => {
    it('should return a user', async () => {
      const request = { user: null };
      const result = await authController.register(request, mockCreateUser);
      expect(result).toBeDefined();
      expect(result).toEqual(mockUser);
    });

    it('should throw an error if the user already exists', async () => {
      const request = { user: null };
      const result = authController.register(request, mockCreateUserAlreadyExists);
      await expect(result).rejects.toThrow(
        new HttpException('User already exists', HttpStatus.CONFLICT),
      );
    });
  });

  describe('update', () => {
    it('should return a user', async () => {
      const request = { user: mockUser };
      const result = await authController.update(request, mockUser);
      expect(result).toBeDefined();
      expect(result).toEqual(mockUser);
    });
  });

  describe('me', () => {
    it('should return a user', async () => {
      const request = { user: mockUser };
      const result = await authController.me(request);
      expect(result).toBeDefined();
      expect(result).toEqual(mockUser);
    });
  });

  describe('delete', () => {
    it('should delete a user', async () => {
      const request = { user: mockUser };
      const result = await authController.delete(request);
      expect(result).toBeDefined();
    });
  });
});

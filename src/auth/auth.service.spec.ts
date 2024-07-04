import * as passwordHelpers from 'src/lib/password-helpers';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

const moduleMocker = new ModuleMocker(global);

const mockUser = {
  first_name: 'First',
  last_name: 'Last',
  username: 'test',
  email: 'test',
  password: 'test',
};

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    })
      .useMocker(token => {
        if (token === UsersService) {
          return {
            findAll: jest.fn(where => {
              if (where[0].username === 'test') {
                return [{ id: '1', username: 'test' }];
              }
              return [];
            }),
            create: jest.fn().mockResolvedValue({ id: '1', username: 'test' }),
            update: jest.fn().mockResolvedValue({ id: '1', username: 'test' }),
          };
        }

        if (token === JwtService) {
          return {
            sign: jest.fn(user => user),
          };
        }

        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(token) as MockFunctionMetadata<any, any>;
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);
          return new Mock();
        }
      })
      .compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('validateUser', () => {
    it('should return a user', async () => {
      jest.spyOn(passwordHelpers, 'matchPassword').mockResolvedValue(true);

      const result = await authService.validateUser({ username: 'test', password: 'test' });
      expect(result).toBeDefined();
      expect(result.id).toEqual('1');
      expect(result.access_token).toBeDefined();
    });

    it('should return null if user not found', async () => {
      const result = await authService.validateUser({
        username: 'non existent',
        password: 'wrong',
      });
      expect(result).toBeNull();
    });

    it('should return null if password does not match', async () => {
      jest.spyOn(passwordHelpers, 'matchPassword').mockResolvedValue(false);

      const result = await authService.validateUser({ username: 'test', password: 'wrong' });
      expect(result).toBeNull();
    });
  });

  describe('register', () => {
    it('should return a user', async () => {
      jest.spyOn(passwordHelpers, 'encrypt').mockResolvedValue('hashed');
      const result = await authService.register(mockUser);
      expect(result).toBeDefined();
      expect(result.id).toEqual('1');
    });
  });

  describe('update', () => {
    it('should return a user', async () => {
      jest.spyOn(passwordHelpers, 'encrypt').mockResolvedValue('hashed');
      const result = await authService.update('1', mockUser);
      expect(result).toBeDefined();
      expect(result.id).toEqual('1');
    });
  });
});

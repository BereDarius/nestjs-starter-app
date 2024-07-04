import { HttpException, HttpStatus } from '@nestjs/common';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';
import { Test, TestingModule } from '@nestjs/testing';
import { RoleEnum } from 'src/auth/enums/roles.enum';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';

const moduleMocker = new ModuleMocker(global);

const mockTodo = {
  title: 'test',
  description: 'test',
  user_id: '1',
  due_date: new Date(),
  status: 'PENDING',
};

describe('TodosController', () => {
  let todosController: TodosController;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [TodosController],
    })
      .useMocker(token => {
        if (token === TodosService) {
          return {
            findOne: jest.fn(id => {
              if (id === '1') {
                return { id, user_id: '1' };
              }
              return undefined;
            }),
            create: jest.fn().mockResolvedValue({ id: '1', user_id: '1' }),
            findAll: jest.fn().mockResolvedValue([{ id: '1', user_id: '1' }]),
            update: jest.fn().mockResolvedValue({ id: '1', user_id: '1' }),
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
    todosController = moduleRef.get<TodosController>(TodosController);
  });

  it('should be defined', () => {
    expect(todosController).toBeDefined();
  });

  describe('getTodoOwnership', () => {
    it('should return a todo', async () => {
      const request = { user: { id: '1', role: RoleEnum.USER } };
      const id = '1';
      const result = await todosController.getTodoOwnership(request, id);
      expect(result).toBeDefined();
      expect(result.id).toEqual('1');
    });

    it('should throw an error if the todo does not exist', async () => {
      const request = { user: { id: '1', role: RoleEnum.USER } };
      const id = '2';
      await expect(todosController.getTodoOwnership(request, id)).rejects.toThrow(
        new HttpException('Not Found', HttpStatus.NOT_FOUND),
      );
    });

    it('should throw an error if the user does not own the todo', async () => {
      const request = { user: { id: '2', role: RoleEnum.USER } };
      const id = '1';
      await expect(todosController.getTodoOwnership(request, id)).rejects.toThrow(
        new HttpException('Forbidden', HttpStatus.FORBIDDEN),
      );
    });

    it('should return a todo if the user is a moderator', async () => {
      const request = { user: { id: '2', role: RoleEnum.MODERATOR } };
      const id = '1';
      const result = await todosController.getTodoOwnership(request, id);
      expect(result).toBeDefined();
      expect(result.id).toEqual('1');
    });

    it('should return a todo if the user is an admin', async () => {
      const request = { user: { id: '2', role: RoleEnum.ADMIN } };
      const id = '1';
      const result = await todosController.getTodoOwnership(request, id);
      expect(result).toBeDefined();
      expect(result.id).toEqual('1');
    });
  });

  describe('create', () => {
    it('should create a todo', async () => {
      const request = { user: { id: '1', role: RoleEnum.USER } };
      const result = await todosController.create(request, mockTodo);
      expect(result).toBeDefined();
      expect(result.id).toEqual('1');
    });
  });

  describe('findAll', () => {
    it('should find all todos', async () => {
      const request = { user: { id: '1', role: RoleEnum.USER } };
      const query = {};
      const result = await todosController.findAll(request, query);
      expect(result).toBeDefined();
      expect(result[0].id).toEqual('1');
    });
  });

  describe('findOne', () => {
    it('should find a todo', async () => {
      const request = { user: { id: '1', role: RoleEnum.USER } };
      const id = '1';
      const result = await todosController.findOne(request, id);
      expect(result).toBeDefined();
      expect(result.id).toEqual('1');
    });

    it('should throw an error if the todo does not exist', async () => {
      const request = { user: { id: '1', role: RoleEnum.USER } };
      const id = '2';
      await expect(todosController.findOne(request, id)).rejects.toThrow(
        new HttpException('Not Found', HttpStatus.NOT_FOUND),
      );
    });
  });

  describe('update', () => {
    it('should update a todo', async () => {
      const request = { user: { id: '1', role: RoleEnum.USER } };
      const id = '1';
      const result = await todosController.update(request, id, mockTodo);
      expect(result).toBeDefined();
      expect(result.id).toEqual('1');
    });
  });

  describe('delete', () => {
    it('should delete a todo', async () => {
      const request = { user: { id: '1', role: RoleEnum.USER } };
      const id = '1';
      const result = await todosController.delete(request, id);
      expect(result).toBeDefined();
    });
  });
});

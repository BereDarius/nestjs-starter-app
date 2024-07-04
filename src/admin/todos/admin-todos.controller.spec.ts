import { HttpException, HttpStatus } from '@nestjs/common';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';
import { Test, TestingModule } from '@nestjs/testing';
import { AdminTodosController } from './admin-todos.controller';
import { TodosService } from 'src/todos/todos.service';

const moduleMocker = new ModuleMocker(global);

const mockTodo = {
  title: 'test',
  description: 'test',
  user_id: '1',
  due_date: new Date(),
  status: 'PENDING',
};

describe('AdminTodosController', () => {
  let adminTodosController: AdminTodosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminTodosController],
    })
      .useMocker(token => {
        if (token === TodosService) {
          return {
            findOne: jest.fn(id => {
              if (id === '1') {
                return mockTodo;
              }
              return null;
            }),
            findAll: jest.fn().mockResolvedValue([mockTodo]),
            create: jest.fn().mockResolvedValue(mockTodo),
            update: jest.fn().mockResolvedValue(mockTodo),
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

    adminTodosController = module.get<AdminTodosController>(AdminTodosController);
  });

  it('should be defined', () => {
    expect(adminTodosController).toBeDefined();
  });

  describe('checkTodoExists', () => {
    it('should return a todo', async () => {
      const result = await adminTodosController.checkTodoExists('1');

      expect(result).toEqual(mockTodo);
    });

    it('should throw an error if todo does not exist', async () => {
      await expect(adminTodosController.checkTodoExists('2')).rejects.toThrow(
        new HttpException('Todo not found', HttpStatus.NOT_FOUND),
      );
    });
  });

  describe('create', () => {
    it('should create a todo', async () => {
      const result = await adminTodosController.create(mockTodo);

      expect(result).toEqual(mockTodo);
    });
  });

  describe('findAll', () => {
    it('should return todos', async () => {
      const result = await adminTodosController.findAll({});

      expect(result).toEqual([mockTodo]);
    });
  });

  describe('findOne', () => {
    it('should return a todo', async () => {
      const result = await adminTodosController.findOne('1');

      expect(result).toEqual(mockTodo);
    });

    it('should throw an error if todo does not exist', async () => {
      await expect(adminTodosController.findOne('2')).rejects.toThrow(
        new HttpException('Todo not found', HttpStatus.NOT_FOUND),
      );
    });
  });

  describe('update', () => {
    it('should update a todo', async () => {
      const result = await adminTodosController.update('1', mockTodo);

      expect(result).toEqual(mockTodo);
    });

    it('should throw an error if todo does not exist', async () => {
      await expect(adminTodosController.update('2', mockTodo)).rejects.toThrow(
        new HttpException('Todo not found', HttpStatus.NOT_FOUND),
      );
    });
  });

  describe('delete', () => {
    it('should delete a todo', async () => {
      const result = await adminTodosController.delete('1');

      expect(result).toEqual({});
    });

    it('should throw an error if todo does not exist', async () => {
      await expect(adminTodosController.delete('2')).rejects.toThrow(
        new HttpException('Todo not found', HttpStatus.NOT_FOUND),
      );
    });
  });
});

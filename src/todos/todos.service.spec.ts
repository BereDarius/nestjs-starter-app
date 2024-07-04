import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todos } from './entities/todo.entity';
import { TodosService } from './todos.service';

const mockTodo = {
  id: 1,
  title: 'Test Todo',
  description: 'Test Description',
  status: 'pending',
};

describe('TodosService', () => {
  let todosService: TodosService;
  let mockRepository: Partial<Record<keyof Repository<Todos>, jest.Mock>>;

  beforeEach(async () => {
    mockRepository = {
      find: jest.fn().mockResolvedValue([mockTodo]),
      findOne: jest.fn().mockResolvedValue(mockTodo),
      save: jest.fn().mockResolvedValue(mockTodo),
      delete: jest.fn().mockResolvedValue(mockTodo),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodosService,
        {
          provide: getRepositoryToken(Todos),
          useValue: mockRepository,
        },
      ],
    }).compile();

    todosService = module.get<TodosService>(TodosService);
  });

  it('should be defined', () => {
    expect(todosService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of todos', async () => {
      await expect(todosService.findAll({})).resolves.toEqual([mockTodo]);
      expect(mockRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single todo', async () => {
      const id = '1';
      await expect(todosService.findOne(id)).resolves.toEqual(mockTodo);
      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id } });
    });
  });

  describe('create', () => {
    it('should successfully insert a todo', async () => {
      const createTodoDto = {
        title: 'New Todo',
        description: 'New Description',
        status: 'pending',
        due_date: new Date(),
        user_id: '1',
      };
      await expect(todosService.create(createTodoDto)).resolves.toEqual(mockTodo);
      expect(mockRepository.save).toHaveBeenCalledWith(createTodoDto);
    });
  });

  describe('delete', () => {
    it('should delete the todo', async () => {
      const id = '1';
      await expect(todosService.delete(id)).resolves.toEqual(mockTodo);
      expect(mockRepository.delete).toHaveBeenCalledWith(id);
    });
  });
});

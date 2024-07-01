import { Test, TestingModule } from '@nestjs/testing';
import { AdminTodosController } from './admin-todos.controller';

describe('AdminTodosController', () => {
  let controller: AdminTodosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminTodosController],
    }).compile();

    controller = module.get<AdminTodosController>(AdminTodosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

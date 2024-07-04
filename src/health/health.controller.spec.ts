import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';
import { Test, TestingModule } from '@nestjs/testing';
import { HealthCheckService } from '@nestjs/terminus';
import { HealthController } from './health.controller';

const moduleMocker = new ModuleMocker(global);

describe('HealthController', () => {
  let healthController: HealthController;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
    })
      .useMocker(token => {
        const result = {
          status: 'ok',
          info: {
            database: { status: 'up' },
            disk: { status: 'up' },
            memory_heap: { status: 'up' },
            memory_rss: { status: 'up' },
          },
          error: {},
          details: {
            database: { status: 'up' },
            disk: { status: 'up' },
            memory_heap: { status: 'up' },
            memory_rss: { status: 'up' },
          },
        };

        if (token === HealthCheckService) {
          return {
            check: jest.fn().mockImplementation(() => Promise.resolve(result)),
          };
        }

        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(token) as MockFunctionMetadata<any, any>;
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);
          return new Mock();
        }
      })
      .compile();

    healthController = moduleRef.get<HealthController>(HealthController);
  });

  it('should be defined', () => {
    expect(healthController).toBeDefined();
  });

  describe('check', () => {
    it('should perform health checks', async () => {
      const result = await healthController.check();

      expect(result).toBeDefined();
      expect(result.status).toEqual('ok');
    });
  });
});

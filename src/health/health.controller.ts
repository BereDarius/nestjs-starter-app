import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  DiskHealthIndicator,
  HealthCheck,
  HealthCheckService,
  MemoryHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { RoleEnum } from 'src/auth/enums/roles.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';

@ApiTags('Health Checks')
@UseGuards(JwtGuard)
@Roles(RoleEnum.ADMIN)
@ApiBearerAuth()
@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly db: TypeOrmHealthIndicator,
    private readonly disk: DiskHealthIndicator,
    private readonly memory: MemoryHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.db.pingCheck('database'),
      () =>
        this.disk.checkStorage('storage', {
          path: '/',
          threshold: 250 * 1024 * 1024 * 1024,
        }),
      () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024),
      () => this.memory.checkRSS('memory_rss', 300 * 1024 * 1024),
    ]);
  }
}

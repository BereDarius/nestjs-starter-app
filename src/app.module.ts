import { Logger, MiddlewareConsumer, Module } from '@nestjs/common';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AdminModule } from './admin/admin.module';
import { APP_GUARD } from '@nestjs/core';
import { AppConfigModule } from './config/app/app-config.module';
import { AuthMiddleware } from './middleware/auth.middleware';
import { AuthModule } from './auth/auth.module';
import { ConfigService } from '@nestjs/config';
import { DatabaseConfigModule } from './config/db/db-config.module';
import { HealthModule } from './health/health.module';
import { MetricsMiddleware } from './middleware/metrics.middleware';
import { MetricsModule } from './metrics/metrics.module';
import { RequestLoggerMiddleware } from './middleware/request-logger.middleware';
import { TodosModule } from './todos/todos.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MetricsModule,
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    AppConfigModule,
    DatabaseConfigModule,
    AuthModule,
    UsersModule,
    TodosModule,
    HealthModule,
    AdminModule,
  ],
  providers: [
    ConfigService,
    Logger,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MetricsMiddleware).forRoutes('*');
    Logger.log('MetricsMiddleware applied', 'AppModule');

    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
    Logger.log('RequestLoggerMiddleware applied', 'AppModule');

    consumer.apply(AuthMiddleware);
    Logger.log('AuthMiddleware applied', 'AppModule');
  }
}

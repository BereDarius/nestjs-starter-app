import { Logger, MiddlewareConsumer, Module } from '@nestjs/common';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AdminModule } from './admin/admin.module';
import { APP_GUARD } from '@nestjs/core';
import { AppConfigModule } from './config/app-config.module';
import { AuthMiddleware } from './middleware/auth.middleware';
import { AuthModule } from './auth/auth.module';
import { DatabaseConfigModule } from './config/database-config.module';
import { HealthModule } from './health/health.module';
import { RequestLoggerMiddleware } from './middleware/request-logger.middleware';
import { TodosModule } from './todos/todos.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 1000,
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
    Logger,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
    Logger.log('RequestLoggerMiddleware applied');

    consumer.apply(AuthMiddleware);
    Logger.log('AuthMiddleware applied');
  }
}

import { Logger, MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AppConfigModule } from './config/app-config.module';
import { DatabaseConfigModule } from './config/database-config.module';
import { AuthMiddleware } from './middleware/auth.middleware';
import { RequestLoggerMiddleware } from './middleware/request-logger.middleware';
import { TodosModule } from './todos/todos.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

console.log('HELLO');

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

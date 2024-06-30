import { Logger, MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AppConfigModule } from './config/app-config.module';
import { DatabaseConfigModule } from './config/database-config.module';
import { AuthMiddleware } from './middleware/auth.middleware';
import { RequestLoggerMiddleware } from './middleware/request-logger.middleware';
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [
    AppConfigModule,
    DatabaseConfigModule,
    AuthModule,
    UsersModule,
    TodosModule,
  ],
  providers: [Logger],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
    consumer.apply(AuthMiddleware);
  }
}

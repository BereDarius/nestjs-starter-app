import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AppConfigModule } from './config/app-config.module';
import { DatabaseConfigModule } from './config/database-config.module';
import { AuthMiddleware } from './middleware/auth.middleware';

@Module({
  imports: [AppConfigModule, DatabaseConfigModule, AuthModule, UsersModule],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware);
  }
}

import { appConfig } from './app.config';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

@Module({
  imports: [ConfigModule.forRoot(appConfig)],
})
export class AppConfigModule {}

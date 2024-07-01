import { HealthController } from './health.controller';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';

@Module({
  imports: [
    TerminusModule.forRoot({
      errorLogStyle: process.env.NODE_ENV === 'development' ? 'pretty' : 'json',
    }),
  ],
  controllers: [HealthController],
})
export class HealthModule {}

import {
  makeCounterProvider,
  makeGaugeProvider,
  PrometheusModule,
} from '@willsoto/nestjs-prometheus';
import { MetricsService } from './metrics.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    PrometheusModule.register({
      path: '/metrics',
      defaultMetrics: {
        enabled: true,
      },
    }),
  ],
  providers: [
    MetricsService,
    makeCounterProvider({
      name: 'http_requests',
      help: 'Total number of HTTP requests',
      labelNames: ['method', 'status_code', 'path'],
    }),
    makeCounterProvider({
      name: 'http_requests_size_bytes',
      help: 'Size of HTTP requests in bytes',
      labelNames: ['method', 'status_code', 'path'],
    }),
    makeCounterProvider({
      name: 'http_responses_size_bytes',
      help: 'Size of HTTP responses in bytes',
      labelNames: ['method', 'status_code', 'path'],
    }),
    makeCounterProvider({
      name: 'http_requests_error',
      help: 'Total number of HTTP requests that resulted in an error',
      labelNames: ['method', 'status_code', 'path'],
    }),
    makeGaugeProvider({
      name: 'http_requests_duration_seconds',
      help: 'HTTP request duration in seconds',
      labelNames: ['method', 'status_code', 'path'],
    }),
  ],
  exports: [PrometheusModule, MetricsService],
})
export class MetricsModule {}

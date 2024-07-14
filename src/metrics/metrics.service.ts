// service.ts
import { Counter, Gauge } from 'prom-client';
import { Injectable } from '@nestjs/common';
import { InjectMetric } from '@willsoto/nestjs-prometheus';

@Injectable()
export class MetricsService {
  constructor(
    @InjectMetric('http_requests') private httpRequestsCounter: Counter<string>,
    @InjectMetric('http_requests_size_bytes') private httpRequestsSizeBytesCounter: Counter<string>,
    @InjectMetric('http_responses_size_bytes')
    private httpResponsesSizeBytesCounter: Counter<string>,
    @InjectMetric('http_requests_error')
    private httpRequestsErrorsCounter: Counter<string>,
    @InjectMetric('http_requests_duration_seconds')
    private httpRequestsDurationGauge: Gauge<string>,
  ) {}

  incrementHttpRequests(method: string, statusCode: number, path: string) {
    this.httpRequestsCounter.inc({ method, status_code: statusCode, path });
  }

  incrementHttpRequestsSizeBytes(method: string, statusCode: number, path: string, size: number) {
    this.httpRequestsSizeBytesCounter.inc({ method, status_code: statusCode, path }, size);
  }

  incrementHttpResponsesSizeBytes(method: string, statusCode: number, path: string, size: number) {
    this.httpResponsesSizeBytesCounter.inc({ method, status_code: statusCode, path }, size);
  }

  incrementHttpResponseErrors(method: string, statusCode: number, path: string) {
    this.httpRequestsErrorsCounter.inc({ method, status_code: statusCode, path });
  }

  startHttpRequestsDurationTimer(method: string, statusCode: number, path: string) {
    return this.httpRequestsDurationGauge.startTimer({ method, status_code: statusCode, path });
  }
}

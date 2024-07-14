import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { MetricsService } from 'src/metrics/metrics.service';

@Injectable()
export class MetricsMiddleware implements NestMiddleware {
  constructor(private readonly metricsService: MetricsService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const stopRequestTimer = this.metricsService.startHttpRequestsDurationTimer(
      req.method,
      res.statusCode,
      req.originalUrl,
    );

    const requestSizeBytes = parseInt(req.get('content-length') || '0', 10);
    this.metricsService.incrementHttpRequestsSizeBytes(
      req.method,
      res.statusCode,
      req.originalUrl,
      requestSizeBytes,
    );

    res.on('finish', () => {
      this.metricsService.incrementHttpRequests(req.method, res.statusCode, req.originalUrl);

      const responseSizeBytes = parseInt(res.get('content-length') || '0', 10);
      this.metricsService.incrementHttpResponsesSizeBytes(
        req.method,
        res.statusCode,
        req.originalUrl,
        responseSizeBytes,
      );

      if (res.statusCode >= 400) {
        this.metricsService.incrementHttpResponseErrors(
          req.method,
          res.statusCode,
          req.originalUrl,
        );
      }

      stopRequestTimer();
    });

    next();
  }
}

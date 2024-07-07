import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  constructor(
    private readonly logger: Logger,
    private readonly configService: ConfigService,
  ) {}

  use(req: Request, res: Response, next: NextFunction) {
    if (this.configService.get('NODE_ENV') === 'development') {
      this.logger.log(`[${req.method}] ${req.originalUrl} - ${req.get('user-agent')} ${req.ip}`);

      res.on('finish', () => {
        const statusCode = res.statusCode;

        statusCode;
        if (statusCode >= 400 && statusCode < 500) {
          this.logger.warn(
            `[${req.method}] ${req.url} - ${req.get('user-agent')} ${req.ip} - ${statusCode} ${res.statusMessage}`,
            'RequestLoggerMiddleware',
          );
        } else if (statusCode >= 500) {
          this.logger.error(
            `[${req.method}] ${req.url} - ${req.get('user-agent')} ${req.ip} - ${statusCode} ${res.statusMessage}`,
            'RequestLoggerMiddleware',
          );
        }
      });
    } else {
      this.logger.log(
        {
          level: 'info',
          method: req.method,
          url: req.originalUrl,
          userAgent: req.get('user-agent'),
          ip: req.ip,
        },
        'RequestLoggerMiddleware',
      );

      res.on('finish', () => {
        const statusCode = res.statusCode;

        if (statusCode >= 400 && statusCode < 500) {
          this.logger.warn(
            {
              level: 'warn',
              method: req.method,
              url: req.originalUrl,
              userAgent: req.get('user-agent'),
              ip: req.ip,
              statusCode,
              statusMessage: res.statusMessage,
            },
            'RequestLoggerMiddleware',
          );
        } else if (statusCode >= 500) {
          this.logger.error(
            {
              level: 'error',
              method: req.method,
              url: req.originalUrl,
              userAgent: req.get('user-agent'),
              ip: req.ip,
              statusCode,
              statusMessage: res.statusMessage,
            },
            'RequestLoggerMiddleware',
          );
        }
      });
    }

    next();
  }
}

import { Logger, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  constructor(private logger: Logger) {}

  use(req: Request, res: Response, next: NextFunction) {
    this.logger.log(
      `[${req.method}] ${req.originalUrl} - ${req.get('user-agent')} ${req.ip}`,
    );

    res.on('finish', () => {
      const statusCode = res.statusCode;
      if (statusCode >= 400) {
        this.logger.warn(
          `[${req.method}] ${req.url} - ${req.get('user-agent')} ${req.ip} - ${statusCode} ${res.statusMessage}`,
        );
      } else if (statusCode >= 500) {
        this.logger.error(
          `[${req.method}] ${req.url} - ${req.get('user-agent')} ${req.ip} - ${statusCode} ${res.statusMessage}`,
        );
      }
    });

    next();
  }
}

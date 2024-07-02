import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const bearerIndex = authHeader.indexOf('Bearer');
      const token = authHeader.substring(bearerIndex + 7);

      try {
        verify(token, process.env.JWT_SECRET);
      } catch (e) {
        throw new HttpException('Invalid access token', HttpStatus.FORBIDDEN);
      }

      next();
    } else {
      throw new HttpException('Access token not found', HttpStatus.FORBIDDEN);
    }
  }
}

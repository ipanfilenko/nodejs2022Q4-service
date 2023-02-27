import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { addEventIntoLog } from './addEventIntoLog';
import { addErrorEventIntoLog } from './addErrorEventIntoLog';

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
  use(request: Request, response: Response, next: NextFunction): void {
    response.on('close', () => {
      const { statusCode } = response;
      const { url, method, params, query, body } = request;
      const addEvent = statusCode >= 500 ? addErrorEventIntoLog : addEventIntoLog;

      addEvent({ url, method, params, query, body, statusCode });
    });

    next();
  }
}

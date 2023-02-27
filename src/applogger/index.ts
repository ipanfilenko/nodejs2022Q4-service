import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { addEventIntoLog } from './addEventIntoLog';
import { addErrorEventIntoLog } from './addErrorEventIntoLog';
import { addExceptionIntoLog } from './addExceptionIntoLog';

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
  use(request: Request, response: Response, next: NextFunction): void {
    response.on('close', () => {
      const { statusCode } = response;
      const { url, method, params, query, body } = request;
      const addEvent = statusCode >= 500 ? addErrorEventIntoLog : addEventIntoLog;

      addEvent({ url, method, params, query, body, statusCode });
    });

    process.on('uncaughtException', (err: Error) => {
      addExceptionIntoLog(err);
      process.exit(1);
    });

    process.on('unhandledRejection', (err: Error) => {
      addExceptionIntoLog(err);
      process.exit(1);
    })

    next();
  }
}

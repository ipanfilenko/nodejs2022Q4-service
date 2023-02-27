import * as fs from 'fs';
import { Request, Response } from 'express';

export const addErrorEventIntoLog = (
  loggerEvent: Partial<Request & Response>,
): void => {
  const { url, method, statusCode } = loggerEvent;

  const stream = fs.createWriteStream('./logs/errors.txt', {
    flags: 'a+',
  });

  console.log(`
        URL: ${url},
        Method: ${method},
        StatusCode: ${statusCode}
    `);

  stream.once('open', () => {
    stream.write(`Date: ${new Date()}\n`);
    stream.write(`Url: ${url}\n`);
    stream.write(`Method: ${method}\n`);
    stream.write(`StatusCode: ${statusCode}\n`);
    stream.write(`-------------------------------------------------\n`);
    stream.end();
  });
};

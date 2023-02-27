import * as fs from 'fs';
import { Request, Response } from 'express';

export const addEventIntoLog = (
  loggerEvent: Partial<Request & Response>,
): void => {
  const stream = fs.createWriteStream('./logs/log.txt', {
    flags: 'a+',
  });

  const { url, method, params, query, body, statusCode } = loggerEvent;

  console.log(`
        URL: ${url},
        Method: ${method},
        Params: ${JSON.stringify(params)},
        Query: ${JSON.stringify(query)},
        Body: ${JSON.stringify(body)},
        StatusCode: ${statusCode}
    `);

  stream.once('open', () => {
    stream.write(`Date: ${new Date()}\n`);
    stream.write(`Url: ${url}\n`);
    stream.write(`Method: ${method}\n`);
    stream.write(`StatusCode: ${statusCode}\n`);
    stream.write(`Params: ${JSON.stringify(params)}\n`);
    stream.write(`Query: ${JSON.stringify(query)}\n`);
    stream.write(`Body: ${JSON.stringify(body)}\n`);
    stream.write(`-------------------------------------------------\n`);
    stream.end();
  });
};

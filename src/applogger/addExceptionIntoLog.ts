import * as fs from 'fs';

export const addExceptionIntoLog = (error: Error): void => {
  const stream = fs.createWriteStream('./logs/errors.txt', {
    flags: 'a+',
  });

  const { name, message } = error;

  stream.once('open', () => {
    stream.write(`Date: ${new Date()}\n`);
    stream.write(`Type: ${name}\n`);
    stream.write(`Message: ${message}\n`);
    stream.write(`-------------------------------------------------\n`);
    stream.end();
  });
};

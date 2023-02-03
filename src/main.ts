import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';

import { readFile } from 'node:fs/promises';
import { parse } from 'yaml';

import { AppModule } from './app.module';

const pathToDocFile = './doc/api.yaml';
const PORT = process.env['PORT'] || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const docFile = await readFile(pathToDocFile, 'utf8'); // TODO: perhaps we need to write documentation (not read)

  SwaggerModule.setup('doc', app, parse(docFile));

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen(PORT);
}

bootstrap();

import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { readFile } from 'node:fs/promises';
import { parse } from 'yaml';

import { AppModule } from './app.module';

const pathToDocFile = './doc/api.yaml';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const docFile = await readFile(pathToDocFile, 'utf8');

  SwaggerModule.setup('doc', app, parse(docFile)); // TODO: perhaps we need to write documentation (not read)

  await app.listen(4000);
}

bootstrap();

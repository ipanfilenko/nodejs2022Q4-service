import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as YAML from 'json-to-pretty-yaml';

import { readFile, writeFile } from 'node:fs/promises';
import { parse } from 'yaml';

import { AppModule } from './app.module';

const pathToDocFile = './doc/api.yaml';
const PORT = process.env['PORT'] || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const docFile = await readFile(pathToDocFile, 'utf8');

  SwaggerModule.setup('doc', app, parse(docFile));

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // TODO: perhaps we need to write documentation (not read)
  /* for updating yml file
  const options = new DocumentBuilder()
    .setTitle("Home Library Service1")
    .setDescription("Home music library service2")
    .setVersion("1.0")
    .build();

  const document = SwaggerModule.createDocument(app, options);
  const data = YAML.stringify(document);

  writeFile("./doc/api.yaml", JSON.stringify(document));
  */

  SwaggerModule.setup('doc', app, parse(docFile));

  await app.listen(PORT);
}

bootstrap();

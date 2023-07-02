import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as express from 'express';
import { logger } from './middleware/logger.middleware';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import { AllExceptionsFilter } from './filter/any-exception.filter';
import { HttpExceptionFilter } from './filter/http-exception.filter';
import { join } from 'path';
import { config } from 'dotenv';

async function bootstrap() {
  const env = config({
    path: `.env.${process.env.NODE_ENV}`,
  }).parsed;
  const app = await NestFactory.create(AppModule);

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // every request print log
  app.use(logger);
  // global interceptor collect log
  app.useGlobalInterceptors(new TransformInterceptor());

  // global exception return format
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalFilters(new HttpExceptionFilter());

  // the rootDir represent the directory on upper-level directory for current directory(the src upper is nest-practice)
  const rootDir = join(__dirname, '..');
  // use route '/static' to map the directory 'upload' under directory 'rootDir'
  app.use('/static', express.static(join(rootDir, '/upload')));

  //   Swagger setup
  const options = new DocumentBuilder()
    .setTitle('nestjs-enterprise')
    .addBearerAuth()
    .setDescription('a completed Nodejs service')
    .setVersion('1.0')
    .addTag('Http')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(env.PORT);
}

bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

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
}

bootstrap();

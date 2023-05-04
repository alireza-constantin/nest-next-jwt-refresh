import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser())
  app.useGlobalPipes(new ValidationPipe())
  app.enableCors({
    credentials: true,
    origin: ['http://localhost:3001', 'http://localhost:3001']
  })
  await app.listen(3000);
}
bootstrap();

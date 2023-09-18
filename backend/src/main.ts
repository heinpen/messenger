import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({ credentials: true, origin: process.env.FRONTEND_URL });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3001);
}

bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { config } from './config/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: config.corsOrigin, credentials: true });
  app.setGlobalPrefix('api');
  app.use(cookieParser());
  await app.listen(3001);
}
bootstrap();

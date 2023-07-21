import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as config from 'config';
import { setupSwagger } from './config/swagger';
import { ValidationPipe } from '@nestjs/common';

const serverConfig = config.get('server');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  setupSwagger(app);

  app.enableCors({
    origin: true,
    credentials: true,
  });
  await app.listen(serverConfig.port);
}

bootstrap();

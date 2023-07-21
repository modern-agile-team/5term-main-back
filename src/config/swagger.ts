import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import expressBasicAuth from 'express-basic-auth';
import * as config from 'config';

const swaggerConfig = config.get('swagger');

export function setupSwagger(app: INestApplication): void {
  app.use(
    ['/docs', '/docs-json'],
    expressBasicAuth({
      challenge: true,
      users: {
        [swaggerConfig.user]: swaggerConfig.password,
      },
    }),
  );
  const option = new DocumentBuilder()
    .setTitle('5term-main-api')
    .setDescription('모임서비스API')
    .setVersion('1.0.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        name: 'JWT',
        in: 'header',
      },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, option);
  SwaggerModule.setup('api-docs', app, document);
}

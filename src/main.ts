import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { instance } from './logger/winston.logger';
import { NestFactory } from '@nestjs/core';
import { WinstonModule } from 'nest-winston';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // Logger setup
    logger: WinstonModule.createLogger({
      instance,
    }),
  });

  // Cookie parser setup
  app.use(cookieParser());

  // CORS setup
  app.enableCors();

  // Validation setup
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Versioning setup
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // Global prefix setup
  app.setGlobalPrefix('api');

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('TODO App API')
    .setDescription('The TODO App API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Compression setup
  app.use(compression());

  // Helmet setup
  app.use(helmet());

  // Start the app
  await app.listen(3000);
}
bootstrap();

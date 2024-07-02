import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as fs from 'fs';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { AppModule } from './app.module';
import { AuthModule } from './auth/auth.module';
import helmet from 'helmet';
import { instance } from './logger/winston.logger';
import { NestFactory } from '@nestjs/core';
import { TodosModule } from './todos/todos.module';
import { UsersModule } from './users/users.module';
import { WinstonModule } from 'nest-winston';

declare const module: any;

async function bootstrap() {
  // HTTPS options
  const httpsOptions = {
    key: fs.readFileSync('./secrets/private-key.pem').toString(),
    cert: fs.readFileSync('./secrets/public-certificate.pem').toString(),
  };

  const app = await NestFactory.create(AppModule, {
    // HTTPS setup
    httpsOptions,
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
      transformOptions: {
        enableImplicitConversion: true,
      },
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
  const swaggerConfig = new DocumentBuilder()
    .setTitle('TODO App API')
    .setDescription('Starter code for an API using NestJS')
    .setVersion('1.0')
    .addBearerAuth()
    .setLicense('MIT', 'https://opensource.org/licenses/MIT')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig, {
    include: [AuthModule, TodosModule, UsersModule],
  });
  SwaggerModule.setup('api', app, document);

  const adminSwaggerConfig = new DocumentBuilder()
    .setTitle('TODO App API (Admin)')
    .setDescription('Starter code for an API using NestJS')
    .setVersion('1.0')
    .addBearerAuth()
    .setLicense('MIT', 'https://opensource.org/licenses/MIT')
    .build();
  const adminDocument = SwaggerModule.createDocument(app, adminSwaggerConfig);
  SwaggerModule.setup('api/admin', app, adminDocument);

  // Compression setup
  app.use(compression());

  // Helmet setup
  app.use(helmet());

  // Start the app
  await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();

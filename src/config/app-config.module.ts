import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        PORT: Joi.number().port().default(3000),
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test')
          .default('development'),
        JWT_SECRET: Joi.string().required().default('secret'),
        LOG_LEVEL: Joi.string()
          .valid('error', 'warn', 'info', 'http', 'verbose', 'debug', 'silly')
          .default('info'),

        DB_HOST: Joi.string().required().default('localhost'),
        DB_PORT: Joi.number().default(5432),
        DB_USER: Joi.string().required().default('postgres'),
        DB_PASSWORD: Joi.string().required().default('password'),
        DB_NAME: Joi.string().required().default('postgres'),
      }),
      cache: true,
    }),
  ],
})
export class AppConfigModule {}

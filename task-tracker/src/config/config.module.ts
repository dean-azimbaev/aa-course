import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';

import { ConfigService as Config } from './config.service';
import configuration from './configuration';
import { databaseConfigSchema } from './database';
import { brokerConfigSchema } from './broker';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        HTTP_PORT: Joi.number().default(5000),
        ...databaseConfigSchema,
        ...brokerConfigSchema
      }),
    }),
  ],
  providers: [ConfigService, Config],
  exports: [ConfigService, Config],
})
export class ConfigurationModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';

import { ConfigurationModule, ConfigService } from './config';
import { SchemaRegistryModule } from './schema-registry';
import { UserModule } from './user';
import { BillingModule } from './billing';

@Module({
  imports: [
    UserModule,
    BillingModule,
    SchemaRegistryModule,
    ConfigurationModule,
    ScheduleModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigurationModule],
      inject: [ConfigService],
      useFactory: ({ pg }: ConfigService) => pg,
    }),
  ],
})
export class AppModule {}

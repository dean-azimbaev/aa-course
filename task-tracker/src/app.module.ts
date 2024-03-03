import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  ConfigurationModule as ConfigModule,
  ConfigService as Config,
} from './config';
import { Resources } from './application';
import { DomainRegistry } from './domain';
import { Adapters } from './port';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [Config],
      useFactory: ({ pg }: Config) => pg,
    }),
  ],
  controllers: [...Resources],
  providers: [...Adapters, DomainRegistry],
})
export class AppModule {}

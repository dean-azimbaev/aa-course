import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule, EventBus } from '@nestjs/cqrs';

import {
  ConfigurationModule as ConfigModule,
  ConfigService as Config,
} from './config';
import { Application } from './application';
import { Resources } from './resource';
import { DomainRegistry } from './domain';
import { Adapters, Messaging, DomainEventPublisher } from './port';

@Module({
  imports: [
    ConfigModule,
    CqrsModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [Config],
      useFactory: ({ pg }: Config) => pg,
    }),
  ],
  controllers: [...Resources],
  providers: [...Adapters, ...Messaging, ...Application, DomainRegistry],
})
export class AppModule implements OnModuleInit {
  constructor(
    private eventBus: EventBus,
    private publisher: DomainEventPublisher,
  ) {}

  async onModuleInit() {
    this.publisher.bind(this.eventBus.publisher);
    //@ts-ignore
    this.eventBus.publisher = this.publisher;
  }
}

import { Inject, Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule, EventBus } from '@nestjs/cqrs';

import {
  ConfigurationModule as ConfigModule,
  ConfigService as Config,
} from './config';
import { Resources, Application } from './application';
import { DomainRegistry } from './domain';
import {
  Adapters,
  DOMAIN_EVENT_PRODUCER,
  Messaging,
  DomainProducer,
} from './port';
import { ClientProxy, ClientsModule } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule,
    CqrsModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [Config],
      useFactory: ({ pg }: Config) => pg,
    }),
    ClientsModule.register([
      {
        name: 'TEST_PRODUCER',
        options: {
          client: {
            clientId: 'task-tracker-producer',
            brokers: ['localhost:9092'],
          },
        },
      },
    ]),
  ],
  controllers: [...Resources],
  providers: [...Adapters, ...Messaging, ...Application, DomainRegistry],
})
export class AppModule implements OnModuleInit {
  constructor(
    @Inject(DOMAIN_EVENT_PRODUCER)
    private domainProducer: DomainProducer,
    private eventBus: EventBus,
  ) {}

  async onModuleInit() {
    // await this.client.connect();

    await this.domainProducer.connect();

    console.log('producer connected');

    this.domainProducer.bind(this.eventBus.publisher);

    this.eventBus.publisher = this.domainProducer;
  }
}

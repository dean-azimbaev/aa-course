import { Provider } from '@nestjs/common';

import { ConfigService as Config } from 'src/config';
import { DomainEventProducer } from './domain-event-producer';
import { KafkaTopicRegistry } from './topics';
import { TaskTrackerConsumer } from './consumer';

export const DOMAIN_EVENT_PRODUCER = Symbol('DOMAIN_EVENT_PRODUCER');
export const CUD_EVENT_PRODUCER = Symbol('CUD_EVENT_PRODUCER');

export const Messaging: Provider[] = [
  KafkaTopicRegistry,
  TaskTrackerConsumer,
  {
    provide: DOMAIN_EVENT_PRODUCER,
    useFactory: ({ kafka }: Config, registry: KafkaTopicRegistry) =>
      new DomainEventProducer(kafka, registry),
    inject: [Config, KafkaTopicRegistry],
  },
];

export * from './types';

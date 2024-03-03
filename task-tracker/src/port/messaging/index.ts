import { Provider } from '@nestjs/common';

import { ConfigService as Config } from 'src/config';
import { DomainEventProducer } from './domain-event-producer';
import { CUDEventProducer } from './cud-event-producer';
import { KafkaTopicRegistry } from './event-topics';

export const DOMAIN_EVENT_PRODUCER = Symbol('DOMAIN_EVENT_PRODUCER');
export const CUD_EVENT_PRODUCER = Symbol('CUD_EVENT_PRODUCER');

class EventRegistry {}

export const Messaging: Provider[] = [
  {
    provide: DOMAIN_EVENT_PRODUCER,
    useFactory: ({ kafka }: Config) => {
      const topics = {};
      const kafkaTopics = new KafkaTopicRegistry();

      return new DomainEventProducer(kafka, kafkaTopics);
    },
    inject: [Config],
  },
  {
    provide: CUD_EVENT_PRODUCER,
    useFactory: ({ kafka }: Config) => new CUDEventProducer(kafka),
    inject: [Config],
  },
];

export * from './types';

import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Kafka, Producer } from 'kafkajs';
import { randomUUID } from 'crypto';

import { CUDEvent, UserCreated, UserUpdated } from './application';
import { UserRoleChanged, DomainEvent } from './domain';

type EventName = string;
type EventMeta = {
  version: number;
  topic: string;
};
type Event = DomainEvent | CUDEvent

@Injectable()
export class AuthProducer implements OnModuleInit {
  private producer: Producer;
  private logger: Logger = new Logger(AuthProducer.name);

  async onModuleInit() {
    const kafka = new Kafka({
      brokers: ['localhost:9092'],
    });

    this.producer = kafka.producer({ allowAutoTopicCreation: true });
    await this.producer.connect();

    this.logger.debug('Connected');
  }

  async produce(event: Event) {
    const eventMeta = this.getEventMeta(event);

    if (!eventMeta) {
      console.warn(
        `Event ${event.name} dont described in producer.eventMeta collection`,
      );
      throw new Error('Event not found');
    }

    this.validateEvent(event, eventMeta.version);

    const messageValue = JSON.stringify({
      event_id: randomUUID(),
      event_version: eventMeta.version,
      event_name: event.name,
      event_time: new Date(),
      producer: AuthProducer.name,
      data: event.toJSON(),
    });

    const meta = await this.producer.send({
      topic: eventMeta.topic,
      messages: [
        {
          key: event.public_id,
          value: messageValue,
        },
      ],
    });

    this.logger.debug(
      `Event: ${event} was sent, record_meta: ${JSON.stringify(meta)}`,
    );
  }

  private eventsMeta: Record<EventName, EventMeta> = {
    [UserCreated.name]: {
      topic: 'users.stream',
      version: 1,
    },
    [UserUpdated.name]: {
      topic: 'users.stream',
      version: 1,
    },
    [UserRoleChanged.name]: {
      topic: 'auth.permission',
      version: 1,
    },
  };

  private getEventMeta(event: Event): EventMeta {
    return this.eventsMeta[event.name];
  }

  private validateEvent(event: Event, version: number) {
    // check event in schema registry
    // compare properties and types
  }
}

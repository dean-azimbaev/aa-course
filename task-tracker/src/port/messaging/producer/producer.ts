import { Injectable, OnModuleInit } from '@nestjs/common';
import { Producer as KafkaProducer, Kafka, Message } from 'kafkajs';
import { randomUUID } from 'crypto';

import { ConfigService } from 'src/config';
import { DomainEvent, CUDEvent, BrokerMessage } from 'src/common';
import { OugoinEventsMetaManager } from './events-meta.manager';

type Event = DomainEvent | CUDEvent;

@Injectable()
export class TaskTrackerProducer implements OnModuleInit {
  private _producer: KafkaProducer;

  constructor(
    private eventsMeta: OugoinEventsMetaManager,
    private config: ConfigService,
  ) {}

  async onModuleInit() {
    const kafka = new Kafka(this.config.kafka);

    this._producer = kafka.producer({
      allowAutoTopicCreation: true,
    });

    await this._producer.connect();
  }

  async produce(event: Event) {
    const topic = this.eventsMeta.getTopic(event);

    const message: Message = {
      value: JSON.stringify(event.toJSON()),
    };

    if (event.public_id) {
      message.key = event.public_id;
    }

    await this.eventsMeta.validate(
      JSON.parse(this.toMessage(event).value as string) as BrokerMessage,
    );

    this._producer.send({
      topic: topic,
      messages: [this.toMessage(event)],
    });
  }

  private toMessage(event: Event): Message {
    const eventMeta = this.eventsMeta.getMeta(event);

    const messageValue: BrokerMessage = {
      producer: TaskTrackerProducer.name,
      event_id: randomUUID(),
      event_name: eventMeta.name,
      event_version: eventMeta.version,
      event_time: new Date().toISOString(),
      data: event.toJSON(),
    };

    const message: Message = {
      value: JSON.stringify(messageValue),
    };

    if (event.public_id) {
      message.key = event.public_id;
    }

    return message;
  }
}

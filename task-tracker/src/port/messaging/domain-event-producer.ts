import { IEvent, IEventPublisher } from '@nestjs/cqrs';
import { Producer, Kafka, KafkaConfig, Message } from 'kafkajs';

import { DomainEvent } from 'src/domain';
import { KafkaTopicRegistry } from './event-topics';
import { DomainProducer } from './types';

export class DomainEventProducer implements DomainProducer {
  private _producer: Producer;
  private _original: IEventPublisher;

  constructor(
    private config: KafkaConfig,
    private topics: KafkaTopicRegistry,
  ) {}

  async connect() {
    const kafka = new Kafka(this.config);

    this._producer = kafka.producer();
    await this._producer.connect();
  }

  publish = <TEvent extends DomainEvent>(event: TEvent, context?: unknown) => {
    const topic = this.topics.getTopic(event);

    const message: Message = {
      value: JSON.stringify(event.toPayload()),
    };

    if (event.id) {
      message.key = event.id;
    }

    console.log(topic);
    console.log(message);

    this._producer.send({
      topic: topic,
      messages: [this.toMessage(event)],
    });

    this._original.publish(event, context);
  };

  bind($publisher: IEventPublisher<IEvent>) {
    console.log('binded');
    console.log($publisher);
    this._original = $publisher;
  }

  private toMessage(event: DomainEvent): Message {
    const result: Message = {
      value: JSON.stringify(event.toPayload()),
    };

    if (event.id) {
      result.key = event.id;
    }

    return result;
  }
}

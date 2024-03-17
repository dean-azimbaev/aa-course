import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Consumer, EachMessagePayload, Kafka, KafkaMessage } from 'kafkajs';

import { ConfigService } from 'src/config';
import { BrokerMessage } from 'src/common';
import { EventsMetaManager, Topics } from './meta.manager';
import { UserCreated, UserUpdated } from './events';
import { UserRepository } from '../data-access';

@Injectable()
export class UserConsumer implements OnModuleInit {
  private consumer: Consumer;
  private logger: Logger = new Logger(UserConsumer.name);

  constructor(
    private config: ConfigService,
    private users: UserRepository,
    private eventsMeta: EventsMetaManager,
  ) {}

  async onModuleInit() {
    const kafka = new Kafka(this.config.kafka);
    console.log(this.config.kafka);

    this.consumer = kafka.consumer({
      groupId: 'user-consumer',
      allowAutoTopicCreation: true,
    });

    await this.consumer.connect();

    this.logger.debug('Consumer connected()');

    await this.consumer.subscribe({
      topic: Topics.USERS_STREAM,
    });

    await this.consumer.run({
      eachMessage: (payload: EachMessagePayload) => {
        return this.consume(payload);
      },
    });

    this.logger.debug(`Billing user consumer connected`);
  }

  private async consume({ message, partition, topic }: EachMessagePayload) {
    this.logger.debug(
      `Consumed message, topic: ${topic}, partition: ${partition}`,
    );
    this.logger.debug(`payload: ${message.value.toString()}`);

    const json = this.deserialize(message);

    await this.eventsMeta.validate(json);

    switch (json.event_name) {
      case UserUpdated.name:
        await this.users.updateUser(
          json.data.public_id,
          json.data.username,
          json.data.role,
        );
        break;
      case UserCreated.name:
        await this.users.createUser(
          json.data.public_id,
          json.data.username,
          json.data.role,
        );
        this.logger.debug(`Billing user created`);
        break;
    }
  }

  private deserialize(message: KafkaMessage): BrokerMessage {
    return JSON.parse(message.value.toString());
  }
}

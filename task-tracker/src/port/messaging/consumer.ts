import { Injectable, Logger, OnModuleInit } from '@nestjs/common';

import { Consumer, EachMessagePayload, Kafka, KafkaMessage } from 'kafkajs';
import { ConfigService } from 'src/config';
import { BrokerMessage } from 'src/common';

import { IncomingTopic } from './incoming-events';

@Injectable()
export class TaskTrackerConsumer implements OnModuleInit {
  private consumer: Consumer;
  private logger: Logger = new Logger(TaskTrackerConsumer.name);

  constructor(private config: ConfigService) {}

  async onModuleInit() {
    console.log(this.config.kafka);
    const kafka = new Kafka(this.config.kafka);

    this.consumer = kafka.consumer({
      groupId: 'task-tracker',
      allowAutoTopicCreation: true,
    });

    await this.consumer.connect();

    await this.consumer.subscribe({
      topics: [IncomingTopic.AUTH_PERMISSION, IncomingTopic.USERS_STREAM],
    });

    await this.consumer.run({
      eachMessage: (payload: EachMessagePayload) => {
        return this.consume(payload);
      },
    });
  }

  private async consume({ message, partition, topic }: EachMessagePayload) {
    this.logger.debug(
      `Consumed message, topic: ${topic}, partition: ${partition}`,
    );
    this.logger.debug(`payload: ${message.value.toString()}`);

    // const json = message.value.toJSON();
    const json = this.deserialize(message);

    console.log('JSON: ', json);
  }

  private deserialize(message: KafkaMessage): BrokerMessage {
    return JSON.parse(message.value.toString());
  }
}

import { Injectable, OnModuleInit } from '@nestjs/common';

import { Consumer, EachMessagePayload, Kafka } from 'kafkajs';
import { ConfigService } from 'src/config';

@Injectable()
export class TaskTrackerConsumer implements OnModuleInit {
  private consumer: Consumer;

  constructor(private config: ConfigService) {}

  async onModuleInit() {
    const kafka = new Kafka(this.config.kafka);

    this.consumer = kafka.consumer({
      groupId: 'task-tracker',
      allowAutoTopicCreation: true,
    });

    await this.consumer.connect();

    await this.consumer.subscribe({
      topic: 'users-stream',
    });

    await this.consumer.run({
      eachMessage: async (payload: EachMessagePayload) => {
        console.log(payload);

        switch (payload.topic) {
          case 'users-stream':
            this.consumeCUDEvents(payload);
          case 'users-auth':
            this.consumeCUDEvents(payload);
          default:
            break;
        }
      },
    });
  }

  private consumeCUDEvents(message: EachMessagePayload) {
    console.log('consumed');
    console.log(message.partition);
    console.log(message.message.value.toString());
  }
}

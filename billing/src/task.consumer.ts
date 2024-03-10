import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Consumer, Kafka } from 'kafkajs';

import { ConfigService } from './config';

@Injectable()
export class TaskConsumer implements OnModuleInit {
  private logger: Logger = new Logger(TaskConsumer.name);

  private consumer: Consumer;

  constructor(private readonly config: ConfigService) {}

  async onModuleInit() {
    const kafka = new Kafka(this.config.kafka);
    this.consumer = kafka.consumer({ groupId: 'task-consumer' });

    await this.consumer.connect();

    this.logger.debug('Connected consumer');

    // await this.consumer.subscribe({});
  }
}

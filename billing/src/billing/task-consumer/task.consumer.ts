import { Injectable, OnModuleInit } from '@nestjs/common';
import { Consumer, EachBatchPayload, EachMessagePayload, Kafka } from 'kafkajs';
import { ConfigService } from 'src/config';

import {
  EventsMetaManager,
  Topics,
} from './events-meta.manager';
import { BrokerMessage } from 'src/common';

@Injectable()
export class TaskConsumer implements OnModuleInit {
  private consumer: Consumer;

  async onModuleInit() {
    const kafka = new Kafka(this.config.kafka);
    this.consumer = kafka.consumer({ groupId: 'billing-task-consumer' });
    await this.consumer.connect();

    await this.consumer.subscribe({
      topics: [Topics.TASK_MANAGEMENT, Topics.TASK_STREAM],
    });

    await this.consumer.run({
      eachBatch: (payload: EachBatchPayload) => this.consumeBatch(payload),
      eachMessage: (payload: EachMessagePayload) => this.consume(payload),
    });
  }

  constructor(
    private config: ConfigService,
    private events: EventsMetaManager,
  ) {}

  private async consume(payload: EachMessagePayload) {
    const json = JSON.parse(payload.message.value.toString()) as BrokerMessage;
    await this.events.validate(json);

    // switch (json.event_name) {
    //     case
    // }
  }

  private async consumeBatch(payload: EachBatchPayload) {}
}

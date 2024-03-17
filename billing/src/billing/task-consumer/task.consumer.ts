import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Consumer, EachBatchPayload, EachMessagePayload, Kafka } from 'kafkajs';
import { ConfigService } from 'src/config';
import { BrokerMessage } from 'src/common';

import { EventsMetaManager, Topics } from './events-meta.manager';
import { NewTaskAdded, TaskCreated, TaskUpdated } from './events';
import { TaskRepository, TransactionRepository } from '../data-access';

@Injectable()
export class TaskConsumer implements OnModuleInit {
  private consumer: Consumer;
  private logger: Logger = new Logger(TaskConsumer.name);

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
    private repository: TaskRepository,
    private operations: TransactionRepository,
  ) {}

  private async consume(payload: EachMessagePayload) {
    const json = JSON.parse(payload.message.value.toString()) as BrokerMessage;

    await this.events.validate(json);

    this.logger.debug(`Consumed message: ${JSON.stringify(json, null, 4)}`);

    switch (json.event_name) {
      case NewTaskAdded.name:
        const added = Object.assign(new NewTaskAdded(), json.data);

        const task = await this.repository.save({
          public_id: added.public_id,
          title: added.title,
        });

        await this.operations.apply_withdraw_transaction(
          task.price,
          added.worker_id,
          task.title,
        );
        break;

      case TaskCreated.name:
        const created = Object.assign(new TaskCreated(), json.data);
        await this.repository.save(created);
        break;

      case TaskUpdated.name:
        const updated = Object.assign(new TaskUpdated(), json.data);
        await this.repository.save(updated);
    }
  }

  private async consumeBatch(payload: EachBatchPayload) {
    this.logger.debug(`Consumed batch messages`);
    this.logger.debug(JSON.stringify(payload, null, 4));
  }
}

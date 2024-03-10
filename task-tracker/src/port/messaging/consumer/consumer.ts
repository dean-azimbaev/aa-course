import { Injectable, Logger, OnModuleInit } from '@nestjs/common';

import { Consumer, EachMessagePayload, Kafka, KafkaMessage } from 'kafkajs';
import { ConfigService } from 'src/config';
import { BrokerMessage } from 'src/common';
import { AuthInteractor } from 'src/application';

import { IncomingEventsMeta, IncomingTopic } from './events-meta.manager';
import { UserCreated, UserRoleChanged, UserUpdated } from './events';

@Injectable()
export class TaskTrackerConsumer implements OnModuleInit {
  private consumer: Consumer;
  private logger: Logger = new Logger(TaskTrackerConsumer.name);

  constructor(
    private config: ConfigService,
    private auth: AuthInteractor,
    private eventsMeta: IncomingEventsMeta,
  ) {}

  async onModuleInit() {
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

    const json = this.deserialize(message);

    //@TODO: implement schema validation
    this.eventsMeta.validate(json);

    switch (json.event_name) {
      case UserRoleChanged.name:
        await this.auth.userRoleChanged(json.data.public_id, json.data.new_role);
        break;
      case UserUpdated.name:
        await this.auth.updateTaskTrackerUser(
          json.data.public_id,
          json.data.username,
          json.data.role,
        );
        break;
      case UserCreated.name:
        await this.auth.createTaskTrackerUser(
          json.data.public_id,
          json.data.username,
          json.data.role,
        );
        this.logger.debug(`Task tracker user created`);
        break;
    }
  }

  private deserialize(message: KafkaMessage): BrokerMessage {
    return JSON.parse(message.value.toString());
  }

  private validateEvent(name: string) {}
}

import { Constructor } from '@nestjs/cqrs';
import { Injectable, OnModuleInit } from '@nestjs/common';

import { DomainEvent, TaskDomainEvents } from 'src/domain';
import { CUDEvent } from 'src/application';
import { Admin, Kafka } from 'kafkajs';
import { ConfigService } from 'src/config';

type Topics = Record<KafkaTopic, Constructor<DomainEvent>[]>;

export enum KafkaTopic {
  TASKS = 'tasks',
  WORKERS = 'workers',
  TASKS_CUD = 'tasks_stream',
}

@Injectable()
export class KafkaTopicRegistry implements OnModuleInit {
  private admin: Admin;

  private static readonly topics: Topics = {
    [KafkaTopic.TASKS]: TaskDomainEvents,
    [KafkaTopic.WORKERS]: [],
    [KafkaTopic.TASKS_CUD]: [],
  };

  getTopic(event: DomainEvent | CUDEvent): string {
    const entries = Object.entries(KafkaTopicRegistry.topics);

    const [topic] = entries.find(([topic, events]) => {
      if (events.some((e) => e.name === event.name)) {
        return topic;
      }
    });

    return topic;
  }

  constructor(private readonly config: ConfigService) {}

  async onModuleInit() {
    // console.log(this.config.kafka)
    // const kafka = new Kafka(this.config.kafka);
    // this.admin = kafka.admin();

    // await this.admin.createTopics({
    //   topics: [
    //     {
    //       topic: KafkaTopic.TASKS,
    //       numPartitions: 1,
    //       replicationFactor: 1,
    //     },
    //   ],
    // });

    // console.log('topic creaded');
    // console.log(await this.admin.listTopics())
  }
}

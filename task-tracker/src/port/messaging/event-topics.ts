import { Constructor } from '@nestjs/cqrs';

import { DomainEvent, TaskDomainEvents } from 'src/domain';
import { CUDEvent } from 'src/application';

type Topics = Record<KafkaTopic, Constructor<DomainEvent>[]>;

export enum KafkaTopic {
  TASKS = 'tasks',
  WORKERS = 'workers',
  TASKS_CUD = 'tasks_stream',
}

export class KafkaTopicRegistry {
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
}

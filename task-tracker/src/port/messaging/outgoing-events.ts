import { Injectable } from '@nestjs/common';

import { NewTaskAdded, TaskCompleted, TaskReassigned } from 'src/domain';
import { DomainEvent, CUDEvent } from 'src/common';
import { TaskCreatedEvent, TaskUpdatedEvent } from 'src/application';

type Event = DomainEvent | CUDEvent;

type EventName = string;

type EventMeta = {
  version: number;
  topic: string;
  name: string;
};

export enum OutgoingTopic {
  AUTH_PERMISSION = 'auth.permission',
  TASKS_MANAGEMENT = 'tasks.management',
  TASKS_STREAM = 'tasks.stream',
}

@Injectable()
export class OutgoingEventsMeta {
  public readonly events: Record<EventName, EventMeta> = {
    [NewTaskAdded.name]: {
      topic: OutgoingTopic.TASKS_MANAGEMENT,
      version: 1,
      name: NewTaskAdded.name,
    },
    [TaskReassigned.name]: {
      topic: OutgoingTopic.TASKS_MANAGEMENT,
      version: 1,
      name: TaskReassigned.name,
    },
    [TaskCompleted.name]: {
      topic: OutgoingTopic.TASKS_MANAGEMENT,
      version: 1,
      name: TaskCompleted.name,
    },
    [TaskCreatedEvent.name]: {
      topic: OutgoingTopic.TASKS_STREAM,
      version: 1,
      name: TaskCreatedEvent.name,
    },
    [TaskUpdatedEvent.name]: {
      topic: OutgoingTopic.TASKS_STREAM,
      version: 1,
      name: TaskUpdatedEvent.name,
    },
  };

  getMeta(event: Event): EventMeta {
    return this.events[event.name];
  }

  getTopic(event: Event): string {
    return this.getMeta(event)?.topic;
  }
}

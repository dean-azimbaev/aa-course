import { Injectable } from '@nestjs/common';

import { NewTaskAdded, TaskCompleted, TaskReassigned } from 'src/domain';
import { DomainEvent, CUDEvent, BrokerMessage } from 'src/common';
import { TaskCreatedEvent, TaskUpdatedEvent } from 'src/application';
import { EventsMeta, EventMeta, EventsMetaManager } from '../event-meta.type';
import { SchemaRegistry } from '../schema.registry';

type Event = DomainEvent | CUDEvent;

export enum OutgoingTopic {
  AUTH_PERMISSION = 'auth.permission',
  TASKS_MANAGEMENT = 'tasks.management',
  TASKS_STREAM = 'tasks.stream',
}

@Injectable()
export class OugoinEventsMetaManager implements EventsMetaManager {
  public readonly events: EventsMeta = {
    [NewTaskAdded.name]: {
      topic: OutgoingTopic.TASKS_MANAGEMENT,
      version: 2,
      name: NewTaskAdded.name,
      domain: 'tasks',
    },
    [TaskReassigned.name]: {
      topic: OutgoingTopic.TASKS_MANAGEMENT,
      version: 1,
      name: TaskReassigned.name,
      domain: 'tasks',
    },
    [TaskCompleted.name]: {
      topic: OutgoingTopic.TASKS_MANAGEMENT,
      version: 1,
      name: TaskCompleted.name,
      domain: 'tasks',
    },
    [TaskCreatedEvent.name]: {
      topic: OutgoingTopic.TASKS_STREAM,
      version: 1,
      name: TaskCreatedEvent.name,
      domain: 'tasks',
    },
    [TaskUpdatedEvent.name]: {
      topic: OutgoingTopic.TASKS_STREAM,
      version: 1,
      name: TaskUpdatedEvent.name,
      domain: 'tasks',
    },
  };

  constructor(private schema: SchemaRegistry) {}

  getMeta(event: Event): EventMeta {
    return this.events[event.name];
  }

  getTopic(event: Event): string {
    return this.getMeta(event)?.topic;
  }

  getMetaByEventName(eventName: string): EventMeta {
    return this.events[eventName];
  }

  async validate(object: BrokerMessage): Promise<void> {
    const event = this.getMetaByEventName(object.event_name);

    if (!event) {
      throw new Error(`Event: ${object.event_name} not found in task tracker`);
    }

    const is_valid = await this.schema.validate(event, object);

    if (!is_valid) {
      throw new Error(
        `Event ${object.event_name} not valid in task tracker, version: ${object.event_version} event_id: ${object.event_id}  not valid for task tracker producer`,
      );
    }
  }
}

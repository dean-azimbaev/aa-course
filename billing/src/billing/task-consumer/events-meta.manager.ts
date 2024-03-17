import { Injectable } from '@nestjs/common';

import {
  BrokerMessage,
  EventsMeta,
  EventMeta,
  EventsMetaManager as IManager,
} from 'src/common';
import { NewTaskAdded, TaskAssigned, TaskCreated, TaskUpdated } from './events';
import { SchemaRegistry } from 'src/schema-registry/schema-registry.service';

type Event = { name: string };

export enum Topics {
  USERS_STREAM = 'users.stream',
  TASK_MANAGEMENT = 'tasks.management',
  TASK_STREAM = 'tasks.stream',
}

@Injectable()
export class EventsMetaManager implements IManager {
  public readonly events: EventsMeta = {
    [NewTaskAdded.name]: {
      topic: Topics.TASK_MANAGEMENT,
      version: 2,
      domain: 'tasks',
      name: NewTaskAdded.name,
    },
    [TaskAssigned.name]: {
      topic: Topics.TASK_MANAGEMENT,
      version: 1,
      domain: 'tasks',
      name: TaskAssigned.name,
    },
    [TaskCreated.name]: {
      topic: Topics.TASK_STREAM,
      version: 1,
      domain: 'tasks',
      name: TaskCreated.name,
    },
    [TaskUpdated.name]: {
      topic: Topics.TASK_STREAM,
      version: 1,
      domain: 'tasks',
      name: TaskUpdated.name,
    },
  };

  constructor(private schema: SchemaRegistry) {}

  getMetaByEventName(eventName: string): EventMeta {
    return this.events[eventName];
  }

  getMeta(event: Event): EventMeta {
    return this.events[event.name];
  }

  getTopic(event: Event): string {
    return this.getMeta(event)?.topic;
  }

  async validate(incomingEvent: BrokerMessage) {
    const event = this.getMetaByEventName(incomingEvent.event_name);

    if (!event) {
      throw new Error(
        `Event: ${incomingEvent.event_name} not found in billing service`,
      );
    }

    const is_valid = await this.schema.validate(event, incomingEvent);

    if (!is_valid) {
      throw new Error(
        `Event from: ${JSON.stringify(incomingEvent, null, 4)} not valid for task tracker consumer`,
      );
    }
  }
}

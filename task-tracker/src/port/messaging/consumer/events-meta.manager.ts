import { Injectable } from '@nestjs/common';

import { BrokerMessage } from 'src/common';
import { UserCreated, UserRoleChanged, UserUpdated } from './events';
import { SchemaRegistry } from '../schema.registry';
import { EventsMeta, EventMeta, EventsMetaManager } from '../event-meta.type';

type Event = { name: string };

export enum IncomingTopic {
  AUTH_PERMISSION = 'auth.permission',
  USERS_STREAM = 'users.stream',
}

@Injectable()
export class IncomingEventsMetaManager implements EventsMetaManager {
  public readonly events: EventsMeta = {
    [UserRoleChanged.name]: {
      topic: IncomingTopic.AUTH_PERMISSION,
      version: 1,
      domain: 'users',
      name: UserRoleChanged.name,
    },
    [UserUpdated.name]: {
      topic: IncomingTopic.USERS_STREAM,
      version: 1,
      domain: 'users',
      name: UserUpdated.name,
    },
    [UserCreated.name]: {
      topic: IncomingTopic.USERS_STREAM,
      version: 1,
      domain: 'users',
      name: UserCreated.name,
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
        `Event: ${incomingEvent.event_name} not found in task tracker`,
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

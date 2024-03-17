import { Injectable } from '@nestjs/common';

import {
  EventsMeta,
  EventMeta,
  EventsMetaManager as IManager,
  BrokerMessage,
} from 'src/common';
import { SchemaRegistry } from 'src/schema-registry/schema-registry.service';
import { UserCreated, UserUpdated } from './events';

type Event = { name: string };

export enum Topics {
  USERS_STREAM = 'users.stream',
}

@Injectable()
export class EventsMetaManager implements IManager {
  public readonly events: EventsMeta = {
    [UserUpdated.name]: {
      topic: Topics.USERS_STREAM,
      version: 1,
      domain: 'users',
      name: UserUpdated.name,
    },
    [UserCreated.name]: {
      topic: Topics.USERS_STREAM,
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

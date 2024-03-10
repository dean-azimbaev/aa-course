import { Injectable } from '@nestjs/common';

import { DomainEvent, CUDEvent, BrokerMessage } from 'src/common';
import { UserCreated, UserRoleChanged, UserUpdated } from './events';

type Event = DomainEvent | CUDEvent;

type EventName = string;

type EventMeta = {
  version: number;
  topic: string;
};

export enum IncomingTopic {
  AUTH_PERMISSION = 'auth.permission',
  USERS_STREAM = 'users.stream',
}

@Injectable()
export class IncomingEventsMeta {
  public readonly events: Record<EventName, EventMeta> = {
    [UserRoleChanged.name]: {
      version: 1,
      topic: IncomingTopic.AUTH_PERMISSION,
    },
    [UserUpdated.name]: {
      version: 1,
      topic: IncomingTopic.USERS_STREAM,
    },
    [UserCreated.name]: {
      version: 1,
      topic: IncomingTopic.USERS_STREAM,
    },
  };

  getMeta(event: Event): EventMeta {
    return this.events[event.name];
  }

  getTopic(event: Event): string {
    return this.getMeta(event)?.topic;
  }

  validate(incomingEvent: BrokerMessage) {
    // validate event with schema registry
  }
}

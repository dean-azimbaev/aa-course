import { Injectable } from '@nestjs/common';

import { DomainEvent, CUDEvent } from 'src/common';

type Event = DomainEvent | CUDEvent;

type EventName = string;

type EventMeta = {
  version: number;
  topic: string;
  name: string;
};

export enum IncomingTopic {
  AUTH_PERMISSION = 'auth.permission',
  USERS_STREAM = 'users.stream'
}

@Injectable()
export class IncomingEventsMeta {
  public readonly events: Record<EventName, EventMeta> = {};

  getMeta(event: Event): EventMeta {
    return this.events[event.name];
  }

  getTopic(event: Event): string {
    return this.getMeta(event)?.topic;
  }
}

import { BrokerMessage } from 'src/common';

export type EventName = string;

export type EventMeta = {
  version: number;
  topic: string;
  domain: string;
  name: string;
};

export type EventsMeta = Record<EventName, EventMeta>;

export type Event = {
  name: string;
};

export interface EventsMetaManager {
  readonly events: EventsMeta;

  getMeta(event: Event): EventMeta;
  getMetaByEventName(eventName: string): EventMeta;
  getTopic(event: Event): string;
  validate(object: BrokerMessage): Promise<void>;
}

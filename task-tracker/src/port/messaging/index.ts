import { Provider } from '@nestjs/common';

import {
  TaskTrackerProducer,
  OutgoingEventsMeta,
  DomainEventPublisher,
} from './producer';

import { TaskTrackerConsumer, IncomingEventsMeta } from './consumer';

export const Messaging: Provider[] = [
  TaskTrackerProducer,
  OutgoingEventsMeta,
  DomainEventPublisher,
  TaskTrackerConsumer,
  IncomingEventsMeta,
];

export { DomainEventPublisher };

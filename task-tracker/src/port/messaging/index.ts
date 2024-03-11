import { Provider } from '@nestjs/common';

import {
  TaskTrackerProducer,
  OugoinEventsMetaManager,
  DomainEventPublisher,
} from './producer';

import {
  TaskTrackerConsumer,
  IncomingEventsMetaManager,
  UserPersister,
} from './consumer';

export const Messaging: Provider[] = [
  TaskTrackerProducer,
  OugoinEventsMetaManager,
  DomainEventPublisher,
  TaskTrackerConsumer,
  IncomingEventsMetaManager,
  UserPersister,
];

export { DomainEventPublisher };

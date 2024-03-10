import { Provider } from '@nestjs/common';

import { TaskTrackerProducer } from './producer';
import { OutgoingEventsMeta } from './outgoing-events';
import { TaskTrackerConsumer } from './consumer';
import { DomainEventPublisher } from './event-publisher';

export const Messaging: Provider[] = [
  OutgoingEventsMeta,
  TaskTrackerConsumer,
  TaskTrackerProducer,
  DomainEventPublisher,
];

export * from './types';
export { DomainEventPublisher };

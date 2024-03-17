import { Provider } from '@nestjs/common';

import { TaskConsumer } from './task.consumer';
import { EventsMetaManager } from './events-meta.manager';

export const TaskConsumerProviders: Provider[] = [
  TaskConsumer,
  EventsMetaManager,
];

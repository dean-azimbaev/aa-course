import { Provider } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { TASK_REPOSITORY, WORKER_REPOSITORY } from 'src/domain/di-token';
import { TaskRepository } from './task';
import { WorkerRepository } from './worker';

export const Persistence: Provider[] = [
  {
    provide: TASK_REPOSITORY,
    inject: [DataSource],
    useFactory: (ds: DataSource) => new TaskRepository(ds),
  },
  {
    provide: WORKER_REPOSITORY,
    inject: [DataSource],
    useFactory: (ds: DataSource) => new WorkerRepository(ds),
  },
];

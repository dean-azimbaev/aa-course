import { Provider } from '@nestjs/common';

import { TASK_REPOSITORY } from 'src/domain/di-token';
import { DataSource } from 'typeorm';
import { TaskRepository } from './task';

export const Persistence: Provider[] = [
  {
    provide: TASK_REPOSITORY,
    inject: [DataSource],
    useFactory: (ds: DataSource) => new TaskRepository(ds),
  },
];

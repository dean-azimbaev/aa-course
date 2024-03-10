import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';

import { TaskRepository } from './task';
import { TASK_REPOSITORY, WORKER_REPOSITORY } from './di-token';
import { WorkerRepository } from './worker';

@Injectable()
export class DomainRegistry {
  constructor(private readonly moduleRef: ModuleRef) {}

  get taskRepository() {
    return this.moduleRef.get<TaskRepository>(TASK_REPOSITORY);
  }

  get workerRepository() {
    return this.moduleRef.get<WorkerRepository>(WORKER_REPOSITORY);
  }
}

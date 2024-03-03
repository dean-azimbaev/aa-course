import { DataSource } from 'typeorm';

import { WorkerRepository as IRepository, Worker } from 'src/domain';
import { TaskTrackerUser, TaskTrackerUserRole } from 'src/data-access';

export class WorkerRepository implements IRepository {
  constructor(private ds: DataSource) {}

  findMostFreeWorker(): Promise<Worker> {
    return this.ds.manager
      .find(TaskTrackerUser, { where: { role: TaskTrackerUserRole.WORKER } })
      .then(([anyWorker]) => anyWorker as unknown as Worker);
  }
}

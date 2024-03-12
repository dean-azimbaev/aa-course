import { DataSource } from 'typeorm';

import { WorkerRepository as IRepository, Worker } from 'src/domain';
import { UserDA } from 'src/data-access';
import { UserRole } from 'src/application';

export class WorkerRepository implements IRepository {
  constructor(private ds: DataSource) {}

  findMostFreeWorker(): Promise<Worker> {
    return this.ds.manager
      .find(UserDA, { where: { role: UserRole.WORKER } })
      .then(([anyWorker]) => anyWorker as unknown as Worker);
  }
}

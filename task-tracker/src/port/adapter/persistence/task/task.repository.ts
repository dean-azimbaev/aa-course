import { DataSource } from 'typeorm';
import * as uuid from 'uuid';

import { TaskRepository as IRepository, Task } from 'src/domain';

export class TaskRepository implements IRepository {
  constructor(private ds: DataSource) {}

  findOne(id: string): Promise<Task> {
    throw new Error('Method not implemented.');
  }
  save(task: Task): Promise<Task> {
    throw new Error('Method not implemented.');
  }
  create(id: string, executor_id: string): Promise<Task> {
    throw new Error('Method not implemented.');
  }
  nextIdentity(): Promise<string> {
    return Promise.resolve(uuid.v4());
  }
}

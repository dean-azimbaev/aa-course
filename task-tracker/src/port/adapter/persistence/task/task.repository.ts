import { DataSource } from 'typeorm';
import * as uuid from 'uuid';

import { TaskRepository as IRepository, Task, Worker } from 'src/domain';
import {
  TaskDA,
  TaskTrackerUserDA,
  TaskTrackerUserRole,
} from 'src/data-access';
import { Logger } from '@nestjs/common';

export class TaskRepository implements IRepository {
  private logger: Logger = new Logger(`Infra: ${TaskRepository.name}`);

  constructor(private ds: DataSource) {}

  async findOne(id: string): Promise<Task> {
    const taskDa = await this.ds.manager.findOne(TaskDA, { where: { id } });

    if (!taskDa) return;

    const worker = await this.ds.manager
      .findOne(TaskTrackerUserDA, {
        where: { id: taskDa.worker_id, role: TaskTrackerUserRole.WORKER },
      })
      .then((user) => (user ? new Worker(user.id) : null));

    if (!worker) {
      this.logger.warn(`Worker for task not found`);
    }

    return Object.assign(
      new Task(taskDa.id, worker, taskDa.description),
      taskDa,
    );
  }

  save(task: Task): Promise<Task> {
    const privateFieldsMapping: Partial<TaskDA> = {
      //@ts-ignore
      worker_id: task.worker.id,
      description: task.description,
    };

    const save = Object.assign(new TaskDA(), privateFieldsMapping, task);

    console.log(save);

    return this.ds.manager.save(TaskDA, save).then(() => task);
  }

  nextIdentity(): Promise<string> {
    return Promise.resolve(uuid.v4());
  }
}

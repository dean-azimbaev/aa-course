import { Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { TaskDA } from './schemas';

@Injectable()
export class TaskRepository {
  private keys: string[] = Object.keys(new TaskDA());
  private logger: Logger = new Logger(TaskRepository.name);

  constructor(private ds: DataSource) {}

  findOne(public_id: string) {
    return this.ds.manager.findOne(TaskDA, { where: { public_id } });
  }

  async save(task: Partial<TaskDA>) {
    this.logger.debug(`Transactional saving, ${JSON.stringify(task)}`);

    const qr = this.ds.createQueryRunner();

    await qr.connect();
    await qr.startTransaction();

    try {
      const exists = await qr.manager.findOne(TaskDA, {
        where: { public_id: task.public_id },
      });

      if (exists) {
        this.logger.debug(`Found existing record, update called !`);
        await qr.manager.update(TaskDA, { public_id: task.public_id }, task);
      } else {
        this.logger.debug(`Insert new record!`);
        await qr.manager.insert(TaskDA, task);
      }

      await qr.commitTransaction();

      this.logger.debug(`Transaction finished, called findOne()`);

      return this.ds.manager.findOne(TaskDA, {
        where: { public_id: task.public_id },
      });
    } catch (e) {
      this.logger.debug('Error while save', e.message);
      await qr.rollbackTransaction();
    } finally {
      await qr.release();
    }
  }

  private cleanupKeys(task: TaskDA): TaskDA {
    return Object.fromEntries(
      Object.entries(task).filter(([key]) => this.keys.includes(key)),
    ) as TaskDA;
  }
}

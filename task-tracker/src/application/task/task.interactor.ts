import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { DomainRegistry } from 'src/domain';
import { AddNewTask } from './command';

@Injectable()
export class TaskInteractor {
  constructor(
    private commands: CommandBus,
    private domainRegistry: DomainRegistry,
  ) {}

  new = async (description: string) => {
    const worker =
      await this.domainRegistry.workerRepository.findMostFreeWorker();

    if (!worker) {
      throw new NotFoundException('Worker for task not found');
    }

    return this.commands.execute(new AddNewTask(description, worker));
  };

  reassign = async (task_id: string) => {};
}

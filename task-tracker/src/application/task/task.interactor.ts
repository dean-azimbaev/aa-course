import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { DomainRegistry } from 'src/domain';
import { AddNewTask, CompleteTask } from './command';

@Injectable()
export class TaskInteractor {
  constructor(
    private commands: CommandBus,
    private domainRegistry: DomainRegistry,
  ) {}

  new = async (title: string, description: string, jira_id: string) => {
    const worker =
      await this.domainRegistry.workerRepository.findMostFreeWorker();

    if (!worker) {
      throw new NotFoundException('Worker for task not found');
    }

    return this.commands.execute(
      new AddNewTask(title, description, jira_id, worker),
    );
  };

  complete = async (task_id: string, worker_id: string) => {
    const task = await this.domainRegistry.taskRepository.findOne(task_id);

    if (!task) {
      throw new NotFoundException();
    }

    this.commands.execute(new CompleteTask(task_id, worker_id));
  };

  shuffle = async () => {};

  reassign = async (task_id: string, worker_id: string) => {};
}

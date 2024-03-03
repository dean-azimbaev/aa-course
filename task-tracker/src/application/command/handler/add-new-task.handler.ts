import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { AddNewTask } from '../add-new-task.command';
import { DomainRegistry, Task } from 'src/domain';

@CommandHandler(AddNewTask)
export class AddNewTaskHandler implements ICommandHandler<AddNewTask> {
  private get taskRepo() {
    return this.registry.taskRepository;
  }

  private get workerRepo() {
    return this.registry.workerRepository;
  }

  constructor(private registry: DomainRegistry) {}

  async execute(): Promise<void> {
    const executor = await this.workerRepo.findMostFreeWorker();
    const taskId = await this.taskRepo.nextIdentity();

    const newTask = Task.New(taskId, executor.id);

    await this.taskRepo.save(newTask);

    // emit event
    newTask.commit();
  }
}

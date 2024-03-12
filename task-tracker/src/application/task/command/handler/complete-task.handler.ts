import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { DomainRegistry, Task } from 'src/domain';
import { CompleteTask } from '../complete-task.command';
import { ForbiddenException } from '@nestjs/common';

@CommandHandler(CompleteTask)
export class AddNewTaskHandler implements ICommandHandler<CompleteTask> {
  private get repository() {
    return this.registry.taskRepository;
  }

  constructor(
    private registry: DomainRegistry,
    private publisher: EventPublisher,
  ) {}

  async execute({ task_id, worker_id }: CompleteTask): Promise<void> {
    const task = this.publisher.mergeObjectContext(
      await this.repository.findOne(task_id),
    );

    if (!task.performedBy(worker_id)) {
      throw new ForbiddenException(``);
    }

    task.complete();

    this.repository.save(task).then(() => task.commit());
  }
}

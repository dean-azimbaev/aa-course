import {
  CommandHandler,
  EventBus,
  EventPublisher,
  ICommandHandler,
} from '@nestjs/cqrs';

import { AddNewTask } from '../add-new-task.command';
import { DomainRegistry, NewTaskAdded, Task } from 'src/domain';

@CommandHandler(AddNewTask)
export class AddNewTaskHandler implements ICommandHandler<AddNewTask> {
  private get taskRepo() {
    return this.registry.taskRepository;
  }

  constructor(
    private registry: DomainRegistry,
    private publisher: EventPublisher,
  ) {}

  async execute({ worker, description }: AddNewTask): Promise<void> {
    const taskId = await this.taskRepo.nextIdentity();

    const newTask = this.publisher.mergeObjectContext(
      Task.New(taskId, description, worker),
    );

    //@ts-ignore
    console.log(newTask);

    await this.taskRepo.save(newTask);

    // emit event
    newTask.commit();
  }
}

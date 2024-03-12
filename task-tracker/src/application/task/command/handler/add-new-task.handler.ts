import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { DomainRegistry, Task } from 'src/domain';
import { AddNewTask } from '../add-new-task.command';

@CommandHandler(AddNewTask)
export class AddNewTaskHandler implements ICommandHandler<AddNewTask> {
  private get taskRepo() {
    return this.registry.taskRepository;
  }

  constructor(
    private registry: DomainRegistry,
    private publisher: EventPublisher,
  ) {}

  async execute({
    title,
    jira_id,
    worker,
    description,
  }: AddNewTask): Promise<void> {
    const taskId = await this.taskRepo.nextIdentity();

    const newTask = this.publisher.mergeObjectContext(
      Task.New(taskId, title, description, jira_id, worker),
    );

    //@ts-ignore
    console.log(newTask);

    await this.taskRepo.save(newTask);

    // emit event
    newTask.commit();
  }
}

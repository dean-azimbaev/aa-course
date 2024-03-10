import { DomainEvent } from '../../event.base';

export class TaskCompleted extends DomainEvent {
  public readonly id: string;

  constructor(id: string) {
    super(TaskCompleted.name);
    this.id = id;
  }
}

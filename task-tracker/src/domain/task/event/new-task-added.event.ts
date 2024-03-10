import { DomainEvent } from '../../event.base';

export class NewTaskAdded extends DomainEvent {
  public readonly id: string;
  public readonly executor_id: string;

  constructor(id: string, executor: string) {
    super(NewTaskAdded.name);

    this.id = id;
    this.executor_id = executor;
  }
}

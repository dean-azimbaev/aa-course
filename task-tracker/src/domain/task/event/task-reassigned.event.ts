import { DomainEvent } from '../../event.base';

export class TaskReassigned extends DomainEvent {
  public readonly id: string;
  public readonly prev_executor_id: string;
  public readonly new_executor_id: string;

  constructor(id: string, prev_executor_id: string, new_executor_id: string) {
    super(TaskReassigned.name);
    this.id = id;
    this.prev_executor_id = prev_executor_id;
    this.new_executor_id = new_executor_id;
  }
}

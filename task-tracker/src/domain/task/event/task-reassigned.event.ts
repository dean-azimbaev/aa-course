import { DomainEvent } from '../../event.base';

export class TaskReassigned extends DomainEvent {
  public readonly id: string;
  public readonly prev_worker_id: string;
  public readonly new_worker_id: string;

  constructor(id: string, prev_executor_id: string, new_executor_id: string) {
    super(TaskReassigned.name);
    this.id = id;
    this.prev_worker_id = prev_executor_id;
    this.new_worker_id = new_executor_id;
  }
}

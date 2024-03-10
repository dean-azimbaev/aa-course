import { DomainEvent } from 'src/common';

export class TaskReassigned extends DomainEvent {
  constructor(
    public readonly public_id: string,
    public readonly prev_worker_id: string,
    public readonly new_worker_id: string,
  ) {
    super(TaskReassigned.name);
  }
}

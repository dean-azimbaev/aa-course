import { CUDEvent, DomainEvent } from 'src/common';

export class NewTaskAdded extends DomainEvent {
  public readonly public_id: string;
  public readonly title: string;
  public readonly description: string;
  public readonly worker_id: string;

  constructor() {
    super(NewTaskAdded.name);
  }
}
export class TaskAssigned extends DomainEvent {
  public readonly public_id: string;
  public readonly prev_worker_id: string;
  public readonly new_worker_id: string;

  constructor() {
    super(TaskAssigned.name);
  }
}

export class TaskCreated extends CUDEvent {
  public readonly public_id: string;
  public readonly title: string;
  public readonly worker_id: string;

  constructor() {
    super(TaskCreated.name);
  }
}
export class TaskUpdated extends CUDEvent {
  public readonly public_id: string;
  public readonly title: string;
  public readonly worker_id: string;

  constructor() {
    super(TaskUpdated.name);
  }
}

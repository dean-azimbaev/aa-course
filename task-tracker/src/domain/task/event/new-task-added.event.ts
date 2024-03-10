import { DomainEvent } from 'src/common';

export class NewTaskAdded extends DomainEvent {
  constructor(
    public readonly public_id: string,
    public readonly worker_id: string,
  ) {
    super(NewTaskAdded.name);
  }
}

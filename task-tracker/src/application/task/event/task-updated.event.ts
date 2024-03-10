import { CUDEvent } from 'src/common';

export class TaskUpdatedEvent extends CUDEvent {
  constructor() {
    super(TaskUpdatedEvent.name);
  }
}

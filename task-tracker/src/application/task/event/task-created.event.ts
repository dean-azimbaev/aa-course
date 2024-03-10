import { CUDEvent } from 'src/common';

export class TaskCreatedEvent extends CUDEvent {
  constructor() {
    super(TaskCreatedEvent.name);
  }
}

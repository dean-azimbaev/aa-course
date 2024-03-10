import { CUDEvent } from '../../cud-event.base';

export class TaskCreatedEvent extends CUDEvent {
  constructor() {
    super(TaskCreatedEvent.name);
  }
}

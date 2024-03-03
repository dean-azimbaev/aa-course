import { CUDEvent } from '../../cud-event.base';

export class TaskUpdatedEvent extends CUDEvent {
  constructor() {
    super(TaskUpdatedEvent.name);
  }
}

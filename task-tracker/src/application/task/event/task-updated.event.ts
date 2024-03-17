import { CUDEvent } from 'src/common';

export class TaskUpdatedEvent extends CUDEvent {
  constructor(
    public readonly public_id: string,
    public readonly title: string,
    public readonly description: string,
    public readonly worker_id: string,
    public readonly jira_id: string,
  ) {
    super(TaskUpdatedEvent.name);
  }
}

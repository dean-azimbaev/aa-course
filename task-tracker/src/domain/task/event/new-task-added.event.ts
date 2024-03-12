import { DomainEvent } from 'src/common';

export class NewTaskAdded extends DomainEvent {
  constructor(
    public readonly public_id: string,
    public readonly worker_id: string,
    public readonly title: string,
    public readonly description: string,
    public readonly jira_id: string,
  ) {
    super(NewTaskAdded.name);
  }
}

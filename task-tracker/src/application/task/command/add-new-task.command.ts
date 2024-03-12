import { Worker } from 'src/domain';

export class AddNewTask {
  constructor(
    public title: string,
    public description: string,
    public jira_id: string,
    public worker: Worker,
  ) {}
}

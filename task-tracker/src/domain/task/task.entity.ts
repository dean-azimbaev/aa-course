import { AggregateRoot } from '@nestjs/cqrs';

import { TaskStatus } from './value';
import { NewTaskAdded, TaskCompleted, TaskReassigned } from './event';
import { Worker } from '../worker';

export class Task extends AggregateRoot {
  public readonly id: string;

  constructor(
    id: string,
    worker: Worker,
    title: string,
    description: string,
    jira_id: string,
  ) {
    super();
    this.id = id;
    this.status = TaskStatus.created();
    this.worker = worker;
    this.title = title;
    this.jira_id = jira_id;
    this.description = description;
  }

  private _status: TaskStatus;
  private _jira_id: string;
  private _title: string;
  private _description: string;

  get jira_id() {
    return this._jira_id;
  }

  private set jira_id(id: string) {
    this._jira_id = id;
  }

  get title() {
    return this._title;
  }

  private set title(title: string) {
    this._title = title;
  }

  get description() {
    return this._description;
  }

  private set description(text: string) {
    this._description = text;
  }

  get status() {
    return this._status;
  }

  private set status(status: TaskStatus) {
    this._status = status;
  }

  public readonly worker: Worker;

  static New = (
    id: string,
    title: string,
    description: string,
    jira_id: string,
    worker: Worker,
  ) => {
    const newTask = new Task(id, worker, title, description, jira_id);

    process.nextTick(() =>
      newTask.publish(
        new NewTaskAdded(id, worker.id, title, description, jira_id),
      ),
    );

    return newTask;
  };

  complete() {
    this.status = TaskStatus.completed();
    this.publish(new TaskCompleted(this.id, this.worker.id));
  }

  reassign(newWorker: Worker) {
    const prev_worker = this.worker;
    //@ts-ignore
    this.worker = newWorker;
    this.publish(new TaskReassigned(this.id, prev_worker.id, newWorker.id));
  }

  performedBy(worker_id: string): boolean {
    return this.worker?.id === worker_id;
  }
}

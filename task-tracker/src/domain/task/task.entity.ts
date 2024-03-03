import { AggregateRoot } from '@nestjs/cqrs';

import { TaskStatus } from './value';
import { NewTaskAdded, TaskCompleted, TaskReassigned } from './event';
import { Worker } from '../worker';

export class Task extends AggregateRoot {
  public readonly id: string;

  private status: TaskStatus;
  private _description: string;
  private worker: Worker;

  constructor(id: string, worker: Worker, description: string) {
    super();
    this.id = id;
    this.status = TaskStatus.created();
    this.worker = worker;
    this._description = description;
  }

  static New = (id: string, description: string, worker: Worker) => {
    const newTask = new Task(id, worker, description);

    process.nextTick(() => newTask.publish(new NewTaskAdded(id, worker.id)));

    return newTask;
  };

  complete() {
    this.status = TaskStatus.completed();
    this.publish(new TaskCompleted(this.id));
  }

  reassign(newWorker: Worker) {
    const prev_worker = this.worker;
    this.worker = newWorker;
    this.publish(new TaskReassigned(this.id, prev_worker.id, newWorker.id));
  }

  get description() {
    return this._description;
  }

  private set description(text: string) {
    this._description = text;
  }
}

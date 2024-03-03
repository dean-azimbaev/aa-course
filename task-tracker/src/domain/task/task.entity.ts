import { AggregateRoot } from '@nestjs/cqrs';

import { TaskStatus } from './value';
import { NewTaskAdded, TaskCompleted, TaskReassigned } from './event';

export class Task extends AggregateRoot {
  public readonly id: string;

  private _status: TaskStatus;
  private _worker_id: string;

  private constructor(id: string, executor_id: string) {
    super();
    this.id = id;
    this._status = TaskStatus.created();
    this._worker_id = executor_id;
  }

  static New = (id: string, executor_id: string) => {
    const newTask = new Task(id, executor_id);

    newTask.publish(new NewTaskAdded(id, executor_id));

    return newTask;
  };

  complete() {
    this._status = TaskStatus.completed();
    this.publish(new TaskCompleted(this.id));
  }

  reassign(new_executor: string) {
    const prev_executor_id = this._worker_id;
    this._worker_id = new_executor;
    this.publish(new TaskReassigned(this.id, prev_executor_id, new_executor));
  }

  get status() {
    return this._status;
  }

  private set status(val: TaskStatus) {
    this._status = val;
  }

  get worker() {}
}

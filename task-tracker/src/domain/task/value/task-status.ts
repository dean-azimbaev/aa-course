export enum TaskStatusEnum {
  CREATED = 'CREATED',
  COMPLETED = 'COMPLETED',
}

export class TaskStatus {
  constructor(public value: TaskStatusEnum) {}

  static created = () => new TaskStatus(TaskStatusEnum.CREATED);
  static completed = () => new TaskStatus(TaskStatusEnum.COMPLETED);
}

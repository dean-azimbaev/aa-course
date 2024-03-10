import { EntitySchema } from 'typeorm';

import { Task, TaskStatus, TaskStatusEnum } from 'src/domain';

export class TaskDA {
  readonly id: string;
  readonly status: TaskStatus;
  readonly worker_id: string;
  readonly description: string;
}

export const TaskSchema = new EntitySchema<TaskDA>({
  tableName: 'task',
  name: 'task',
  target: TaskDA,
  columns: {
    id: {
      primary: true,
      type: 'uuid',
    },
    status: {
      enum: TaskStatusEnum,
      type: 'enum',
      transformer: {
        from: (status: TaskStatusEnum) => new TaskStatus(status),
        to: ({ value }: TaskStatus) => value,
      },
    },
    description: {
      type: 'varchar',
    },
    worker_id: {
      type: 'uuid',
    },
  },
});

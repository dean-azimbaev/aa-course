import { EntitySchema } from 'typeorm';

import { Task, TaskStatus, TaskStatusEnum } from 'src/domain';

export const TaskSchema = new EntitySchema<Task>({
  tableName: 'task',
  name: 'task',
  target: Task,
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
    worker: {
      type: 'uuid',
    },
  },
});

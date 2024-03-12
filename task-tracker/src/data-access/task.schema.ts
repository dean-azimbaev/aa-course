import { EntitySchema } from 'typeorm';

import { TaskStatus, TaskStatusEnum } from 'src/domain';

export class TaskDA {
  readonly id: string;
  readonly status: TaskStatus;
  readonly worker_id: string;
  readonly title: string;
  readonly jira_id: string;
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
    jira_id: {
      type: 'varchar',
    },
    title: {
      type: 'varchar',
    },
    description: {
      type: 'varchar',
    },
    worker_id: {
      type: 'uuid',
    },
  },
});

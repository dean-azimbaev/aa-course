import { EntitySchema } from 'typeorm';

export enum TaskTrackerUserRole {
  WORKER = 'WORKER',
  MANAGER = 'MANAGER',
}

export class TaskTrackerUserDA {
  readonly id: string;
  readonly public_id: string;
  readonly role: TaskTrackerUserRole;
}

export const TaskTrackerUserSchema = new EntitySchema<TaskTrackerUserDA>({
  name: 'user',
  tableName: 'user',
  target: TaskTrackerUserDA,
  columns: {
    id: {
      type: 'uuid',
      primary: true,
      generated: 'uuid',
    },
    public_id: {
      type: 'uuid',
      nullable: true,
    },
    role: {
      type: 'enum',
      enum: TaskTrackerUserRole,
    },
  },
});

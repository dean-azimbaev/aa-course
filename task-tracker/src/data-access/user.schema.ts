import { EntitySchema } from 'typeorm';

enum TaskTrackerUserRole {
  WORKER = 'WORKER',
  MANAGER = 'MANAGER',
}

export class TaskTrackerUser {
  readonly id: string;
  readonly public_id: string;
  readonly role: TaskTrackerUserRole;
}

export const UserSchema = new EntitySchema<TaskTrackerUser>({
  name: 'user',
  tableName: 'user',
  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: true,
    },
    public_id: {
      type: 'uuid',
      nullable: true,
    },
    role: {
      type: 'enum',
      enum: [TaskTrackerUserRole],
    },
  },
});

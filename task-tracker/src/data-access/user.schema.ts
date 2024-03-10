import { EntitySchema } from 'typeorm';

export enum UserRole {
  WORKER = 'WORKER',
  MANAGER = 'MANAGER',
  ADMIN = 'ADMIN',
}

export class UserDA {
  readonly public_id: string;
  readonly id: string;
  public username: string;
  public role: UserRole;
}

export const TaskTrackerUserSchema = new EntitySchema<UserDA>({
  name: 'user',
  tableName: 'user',
  target: UserDA,
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
    username: {
      type: 'varchar',
    },
    role: {
      type: 'enum',
      enum: UserRole,
    },
  },
});

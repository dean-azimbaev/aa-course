import { EntitySchema } from 'typeorm';

import { UserRole } from 'src/application';

export class UserDA {
  readonly id: string;
  readonly public_id: string;
  readonly username: string;
  readonly role: UserRole;
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

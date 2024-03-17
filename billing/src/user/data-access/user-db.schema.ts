import { EntitySchema } from 'typeorm';

import { UserRole } from '../role.enum';

export class UserDA {
  public_id: string;
  role: UserRole;
  id: string;
  username: string;
  balance: number;
}

export const UserSchema = new EntitySchema<UserDA>({
  name: 'User',
  tableName: 'user',
  target: UserDA,
  columns: {
    id: {
      type: 'uuid',
      generated: 'uuid',
      primary: true,
    },
    public_id: {
      type: 'uuid',
      generated: 'uuid',
    },
    username: {
      type: 'varchar',
      unique: true,
    },
    role: {
      type: 'enum',
      enum: UserRole,
    },
    balance: {
      type: 'int',
      default: 0,
    },
  },
});

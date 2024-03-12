import { EntitySchema } from 'typeorm';

export enum UserRole {
  ADMIN = 'ADMIN',
  WORKER = 'WORKER',
  MANAGER = 'MANAGER',
}

export class UserDA {
  public_id: string;
  role: UserRole;
  id: string;
  username: string;
  balance: number;
}

export const UserSchema = new EntitySchema<UserDA>({
  name: 'user',
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
    },
  },
});

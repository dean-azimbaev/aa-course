import { EntitySchema } from 'typeorm';

export enum UserRole {
  ADMIN = 'ADMIN',
  WORKER = 'WORKER',
  MANAGER = 'MANAGER',
}

export class UserDA {
  public_id: string;
  id: string;
  username: string;
  password: string;
  role: UserRole;
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
    password: {
      type: 'varchar',
    },
    role: {
      type: 'enum',
      enum: UserRole,
    },
  },
});

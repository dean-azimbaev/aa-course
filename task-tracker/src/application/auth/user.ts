import { UserRole } from './user-role.enum';

export class User {
  public readonly public_id: string;
  public readonly username: string;
  public readonly role: UserRole;
}

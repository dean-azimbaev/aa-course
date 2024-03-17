import { CUDEvent } from 'src/common';
import { UserRole } from '../role.enum';

export class UserUpdated extends CUDEvent {
  constructor(
    public public_id: string,
    public username: string,
    public role: UserRole,
  ) {
    super(UserUpdated.name);
  }
}

export class UserCreated extends CUDEvent {
  constructor(
    public public_id: string,
    public username: string,
    public role: UserRole,
  ) {
    super(UserCreated.name);
  }
}

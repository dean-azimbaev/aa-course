import { CUDEvent, DomainEvent } from 'src/common';
import { UserRole } from 'src/data-access';

export class UserRoleChanged extends DomainEvent {
  constructor(
    public public_id: string,
    public newRole: UserRole,
  ) {
    super(UserRoleChanged.name);
  }
}

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

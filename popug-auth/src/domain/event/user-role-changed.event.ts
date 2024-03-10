import { UserRole } from 'src/data-access';
import { DomainEvent } from './domain.event';

export class UserRoleChanged extends DomainEvent {
  constructor(
    public readonly public_id: string,
    public readonly new_role: UserRole,
  ) {
    super(UserRoleChanged.name, public_id);
  }
}

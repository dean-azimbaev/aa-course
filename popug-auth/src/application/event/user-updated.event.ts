import { UserRole } from 'src/data-access';
import { CUDEvent } from './cud-event';

export class UserUpdated extends CUDEvent {
  constructor(
    public public_id: string,
    public username: string,
    public role: UserRole,
  ) {
    super(UserUpdated.name);
  }
}

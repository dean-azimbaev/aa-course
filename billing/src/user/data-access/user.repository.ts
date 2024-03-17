import { Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { UserDA } from './user-db.schema';
import { UserRole } from '../role.enum';

@Injectable()
export class UserRepository {
  private logger: Logger = new Logger(UserRepository.name);

  constructor(private ds: DataSource) {}

  async createUser(public_id: string, username: string, role: UserRole) {
    await this.ds.manager.save(UserDA, {
      public_id,
      username,
      role,
    });
    this.logger.debug(`billing user created`);
  }

  async updateUser(public_id: string, username: string, role: UserRole) {
    const userToUpdate = await this.ds.manager.findOne(UserDA, {
      where: { public_id },
    });

    if (userToUpdate) {
      await this.ds.manager.save(
        Object.assign(new UserDA(), userToUpdate, { username, role }),
      );
      this.logger.debug(`billing user updated`);
      return;
    }

    await this.ds.manager.save(UserDA, {
      public_id,
      username,
      role,
    });
    this.logger.debug(`billing user upserted`);
  }
}

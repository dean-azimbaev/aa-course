import { Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { UserRole } from 'src/application';
import { UserDA } from 'src/data-access';

@Injectable()
export class UserPersister {
  private logger: Logger = new Logger(UserPersister.name);

  constructor(private ds: DataSource) {}

  async createUser(public_id: string, username: string, role: UserRole) {
    this.logger.debug(`createTaskTrackerUser()`);
    await this.ds.manager.save(UserDA, {
      public_id,
      username,
      role,
    });
    this.logger.debug(`task tracker user created`);
  }

  async updateUser(public_id: string, username: string, role: UserRole) {
    this.logger.debug(`updatedTaskTrackerUser()`);
    const userToUpdate = await this.ds.manager.findOne(UserDA, {
      where: { public_id },
    });

    if (userToUpdate) {
      await this.ds.manager.save(
        Object.assign(new UserDA(), userToUpdate, { username, role }),
      );
      this.logger.debug(`task tracker user updated`);
      return;
    }

    await this.ds.manager.save(UserDA, {
      public_id,
      username,
      role,
    });
    this.logger.debug(`task tracker user upserted`);
  }

  async changeRole(user_public_id: string, newRole: UserRole) {
    this.logger.debug(
      `changeRole(user_public_id, newRole) -> (${user_public_id}, ${newRole})`,
    );
    // const user = await this.ds.manager.findOne(UserDA, {
    //   where: { public_id: user_public_id },
    // });

    // if (user) {
    //   user.role = newRole;
    // }

    // await this.ds.manager.save(user);
    this.logger.debug(`User role changed`);
    // call business logic related to role changes
  }
}

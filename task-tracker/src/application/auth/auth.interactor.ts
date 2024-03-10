import { Injectable, Logger } from '@nestjs/common';
import { UserDA, UserRole } from 'src/data-access';
import { DataSource } from 'typeorm';

@Injectable()
export class AuthInteractor {
  private logger: Logger = new Logger(AuthInteractor.name);

  constructor(private ds: DataSource) {}

  async createTaskTrackerUser(
    public_id: string,
    username: string,
    role: UserRole,
  ) {
    this.logger.debug(`createTaskTrackerUser()`);
    await this.ds.manager.save(UserDA, {
      public_id,
      username,
      role,
    });
    this.logger.debug(`task tracker user created`);
  }

  async updateTaskTrackerUser(
    public_id: string,
    username: string,
    role: UserRole,
  ) {
    this.logger.debug(`updatedTaskTrackerUser()`);
    const userToUpdate = await this.ds.manager.findOne(UserDA, {
      where: { public_id },
    });

    if (userToUpdate) {
      userToUpdate.username = username;
      userToUpdate.role = role;
      await this.ds.manager.save(userToUpdate);
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

  async userRoleChanged(user_public_id: string, newRole: UserRole) {
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

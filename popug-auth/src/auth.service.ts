import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DataSource } from 'typeorm';

import { UserDA, UserRole } from './data-access';
import { UserCreated, UserUpdated } from './application';
import { AuthProducer } from './app.producer';
import { UserRoleChanged } from './domain';
import { SignUpDTO } from './app.controller';

@Injectable()
export class AuthService {
  constructor(
    private ds: DataSource,
    private jwt: JwtService,
    private producer: AuthProducer,
  ) {}

  async findByUsername(username: string) {
    return this.ds.manager.findOne(UserDA, { where: { username } });
  }
  async findById(id: string) {
    return this.ds.manager.findOne(UserDA, { where: { id } });
  }

  async changeRole(id: string, newRole: UserRole) {
    const user = await this.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.role === newRole) {
      return;
    }

    user.role = newRole;

    await this.ds.manager.save(user);

    this.producer.produce(
      new UserUpdated(user.public_id, user.username, user.role),
    );
    this.producer.produce(new UserRoleChanged(user.public_id, user.role));
  }

  async signup(dto: SignUpDTO) {
    const user = this.ds.manager.create(UserDA, dto);
    const saved = await this.ds.manager.save(user);

    const event = new UserCreated(
      saved.public_id,
      saved.username,
      saved.role,
    );

    this.producer.produce(event);

    return saved;
  }

  async signin(username: string, password: string) {
    const user = await this.ds.manager.findOne(UserDA, { where: { username } });

    if (!user) {
      throw new ForbiddenException('username or password incorrect');
    }

    if (user.password !== password) {
      throw new ForbiddenException('username or password incorrect');
    }

    const access_token = await this._token(user);

    return {
      access_token,
    };
  }

  private _token = (user: UserDA) => {
    return this.jwt.signAsync({
      sub: user.public_id,
      username: user.username,
      role: user.role,
    });
  };
}

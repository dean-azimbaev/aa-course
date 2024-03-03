import { Injectable } from '@nestjs/common';
import { ConfigService as Config } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { AppOptions } from './app.options';

@Injectable()
export class ConfigService {
  constructor(private config: Config) {}

  get app(): AppOptions {
    return this.config.get<AppOptions>('config.app');
  }

  get pg(): TypeOrmModuleOptions {
    return this.config.get<TypeOrmModuleOptions>('config.databases.pg');
  }

  get broker(): any {
    return {};
  }
}

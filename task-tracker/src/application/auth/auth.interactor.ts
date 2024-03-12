import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

import { User } from './user';
import { ConfigService } from 'src/config';

@Injectable()
export class AuthInteractor {
  private get VERIFY() {
    return `${this.config.jwtUrl}/verify`;
  }

  constructor(
    private http: HttpService,
    private config: ConfigService,
  ) {}

  verify = (jwt: string): Promise<User> => {
    return lastValueFrom(this.http.post(this.VERIFY, { jwt })).then(
      ({ data }) => data,
    );
  };
}

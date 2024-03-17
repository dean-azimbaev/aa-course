import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

import { AuthInteractor } from './auth.interactor';

@Injectable()
export class AuthGuard implements CanActivate {
  private logger: Logger = new Logger(AuthGuard.name);

  constructor(private auth: AuthInteractor) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const req = context.switchToHttp().getRequest();
      const jwt = this.extractJwtFromRequest(req);

      if (!jwt) {
        throw new UnauthorizedException('Jwt not provided');
      }

      const user = await this.auth.verify(jwt);

      this.logger.debug(`Verified jwt: ${JSON.stringify(user)}`);

      req.user = user;

      return true;
    } catch (e) {
      this.logger.debug(`JWT Verification failure: ${e.message}`);
      throw new UnauthorizedException(e.message);
    }
  }

  private extractJwtFromRequest(req: Request): string {
    return req.headers['authorization']?.split('Bearer ')[1];
  }
}

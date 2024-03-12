import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const UserDecorator = createParamDecorator(
  (key: string, ctx: ExecutionContext) => {
    const { user } = ctx.switchToHttp().getRequest();
    return user ? user[key] : null;
  },
);

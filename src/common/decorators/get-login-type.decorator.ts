import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const GetLoginType = createParamDecorator(
  (data, ctx: ExecutionContext): number => {
    const req = ctx.switchToHttp().getRequest();

    return req.user.loginType;
  },
);

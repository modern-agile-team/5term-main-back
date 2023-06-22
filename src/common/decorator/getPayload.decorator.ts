import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const GetPayload = createParamDecorator(
  (data, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();

    return req.user.userId;
  },
);

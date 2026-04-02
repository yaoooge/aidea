import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export type JwtUserPayload = {
  id: string;
  username: string;
  email: string;
  roles: string[];
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): JwtUserPayload => {
    const req = ctx.switchToHttp().getRequest<{ user: JwtUserPayload }>();
    return req.user;
  },
);

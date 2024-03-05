import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const Note = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.note;
  },
);

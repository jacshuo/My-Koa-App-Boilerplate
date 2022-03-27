import { Next } from 'koa';
import { UnifyContext } from 'app';

// eslint-disable-next-line import/prefer-default-export
export const IndexController = async (ctx: UnifyContext, next: Next) => {
  ctx.logger.info('this is my ctx logger from controller!');
  ctx.body = {
    code: 0,
    msg: 'hello world!',
    data: null,
  };
  await next();
};

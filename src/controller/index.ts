import {Next} from "koa";
import {UnifyContext} from "app";

export const IndexController = async (ctx: UnifyContext, next: Next) => {
  ctx.logger.info("this is my ctx logger from controller!");
  ctx.body = {
    code: 0,
    msg: "hello world!",
    data: null,
  };
  await next();
};

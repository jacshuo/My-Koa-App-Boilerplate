import {Context, Next} from "koa";
import {logger} from "../common/logger";

export const IndexController = async (ctx: Context, next: Next) => {
  ctx.body = {
    code: 0,
    msg: "hello world!",
    data: null,
  };
  await next();
};

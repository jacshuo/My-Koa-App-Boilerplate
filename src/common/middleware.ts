// 全局中间件
import {Context, Next, Middleware} from "koa";
import {logger} from "./logger";

const middlewares: (() => Middleware)[] = [
  (): (ctx: Context, next: Next) => Promise<void> => {
    return async (ctx: Context, next: Next): Promise<void> => {
      logger.info("HELLO, from my middleware!");
      try {
        await next();
      } catch (e: any) {
        ctx.status = e.status || 500;
        ctx.body = e.message;
      }
    };
  },
];


export default middlewares;

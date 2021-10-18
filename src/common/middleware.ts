// 其他全局预加挂定制中间件
import {Next} from "koa";
import {UnifyContext, UnifyMiddleware} from "app";

export type CustomizedMiddleware = (...params: any) => UnifyMiddleware
// 标准或定制（带参数）中间件数组类型
export type CustomizedMiddlewares = CustomizedMiddleware[]

const middlewares: CustomizedMiddlewares = [
  (): (ctx: UnifyContext, next: Next) => Promise<void> => {
    return async (ctx: UnifyContext, next: Next): Promise<void> => {
      ctx.logger.info("HELLO, from my middleware!");
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

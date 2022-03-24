import {UnifyContext} from "app";
import {Next} from "koa";
import {CustomizedMiddleware} from "common/middleware";
import {IConfig} from "app/config";

const configMiddleware: CustomizedMiddleware = (config: IConfig): (
  ctx: UnifyContext, next: Next) => Promise<void> => {
  return async (ctx: UnifyContext, next: Next) => {
    ctx.config = config;
    try {
      await next();
    } catch (e: any) {
      ctx.status = e.status || 500;
      ctx.body = e.message;
    }
  };
};

export default configMiddleware;

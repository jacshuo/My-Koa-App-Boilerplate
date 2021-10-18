import Koa, {DefaultContext, DefaultState, Middleware} from "koa";
import bodyParser from "koa-bodyparser";
import logger from "../common/middleware/loggerMiddleware";
import winston, {Logger} from "winston";
import cors from "@koa/cors";
import middlewares from "../common/middleware";
import router from "../router";
import config, {IConfig} from "./config";
import configMiddleware from "../common/middleware/configMiddleware";

// 扩展DefaultContext接口
export interface UnifyContext extends DefaultContext {
  // 加挂Context的额外属性
  logger: Logger;
  // 加挂Config设置
  config: IConfig;
}

// 扩展Middleware，使用扩展后的UnifyContext，更好地类型约束和代码提示
export type UnifyMiddleware = Middleware<DefaultState, UnifyContext>

// 创建新的Koa实例
const app = new Koa<DefaultState, UnifyContext>({});

// 挂载全局框架中间件（配置、跨域、日志、bodyparser等）
app.use(configMiddleware(config));
app.use(cors());
app.use(bodyParser());
app.use(logger(winston));
// 挂载全局自定义中间件（自定义日志、session、jwt等）
middlewares.map((middleware) => {
  app.use(middleware());
});

// 挂载路由
app.use(router.routes()).use(router.allowedMethods());

export default app;

import Koa, { DefaultContext, DefaultState, Middleware } from "koa";
import { Logger } from "winston";
import { IConfig } from "./config";
export interface UnifyContext extends DefaultContext {
    logger: Logger;
    config: IConfig;
}
export declare type UnifyMiddleware = Middleware<DefaultState, UnifyContext>;
declare const app: Koa<Koa.DefaultState, UnifyContext>;
export default app;
//# sourceMappingURL=index.d.ts.map
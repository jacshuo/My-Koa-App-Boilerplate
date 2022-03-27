import { UnifyMiddleware } from "app";

export declare type CustomizedMiddleware = (...params: any) => UnifyMiddleware;
export declare type CustomizedMiddlewares = CustomizedMiddleware[];
declare const middlewares: CustomizedMiddlewares;
export default middlewares;
// # sourceMappingURL=middleware.d.ts.map
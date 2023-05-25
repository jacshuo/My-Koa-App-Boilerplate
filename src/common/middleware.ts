// 其他全局预加挂定制中间件
import { UnifyMiddleware } from 'app';

export type CustomizedMiddleware = (...params: any) => UnifyMiddleware;
// 标准或定制（带参数）中间件数组类型
export type CustomizedMiddlewares = CustomizedMiddleware[];

const middlewares: CustomizedMiddlewares = [];

export default middlewares;

// 全局助手函数
import { UnifyContext } from 'app';

export interface responseFormat {
  code: 0 | -1;
  msg: string;
  data: [] | { [k: string]: any };
}

export type ResponseData<T> = T[] | T;

export const respond = (
  ctx: UnifyContext,
  data: ResponseData<any>,
  code: 0 | -1 = 0,
  msg: string = '',
): void => {
  ctx.body = {
    code,
    msg,
    data,
  };
};

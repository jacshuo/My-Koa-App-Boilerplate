import Koa, { DefaultContext, DefaultState, Middleware } from 'koa';
import bodyParser from 'koa-bodyparser';
import winston, { format, Logger, transports } from 'winston';
import cors from '@koa/cors';
import KeyGrip from 'keygrip';
import session from 'koa-session';
import middlewares from 'common/middleware';
import router from 'router';
import DailyRotateFile from 'winston-daily-rotate-file';
import config, { IConfig } from './config';
// 静态资源Serve
// import serve from "koa-static";

// 扩展DefaultContext接口
export interface UnifyContext extends DefaultContext {
  // 加挂Context的额外属性
  logger: Logger;
  // 加挂Config设置
  config: IConfig;
}

// 扩展Middleware，使用扩展后的UnifyContext，更好地类型约束和代码提示
export type UnifyMiddleware = Middleware<DefaultState, UnifyContext>;
// 创建新的Koa实例
const app = new Koa<DefaultState, UnifyContext | DefaultContext>({});
// 创建新的logger实例
const createLogger = (conf: IConfig): any =>
  winston.createLogger({
    level: conf.debug ? 'debug' : 'info',
    format: format.combine(
      format.label({ label: 'FILE-LOG' }),
      format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss.SSS',
      }),
      format.printf(
        ({ level, message, label, timestamp }) => `${timestamp} [${label}] ${level}: ${message}`,
      ),
    ),
    transports: [
      new DailyRotateFile({
        json: conf.logJSONFormat,
        datePattern: conf.logDatePattern,
        filename: conf.logFileName,
        zippedArchive: conf.logZipArchive,
        dirname: conf.logFileDir,
        maxSize: `${conf.logMaxSize}m`,
        maxFiles: conf.logMaxFiles,
      }),
      new transports.Console({
        format: format.combine(
          format.label({ label: 'CONSOLE-LOG' }),
          format.timestamp(),
          format.colorize(),
          format.printf(
            ({ level, message, label, timestamp }) =>
              `${timestamp} [${label}] ${level}: ${message}`,
          ),
        ),
      }),
    ],
  });
const logger = createLogger(config);
app.keys = new KeyGrip(['I love home'], 'sha256');

// 挂载全局框架中间件（配置、跨域、日志、bodyparser等）
app.use(async (ctx: UnifyContext, next) => {
  // 加挂logger
  ctx.logger = logger;
  await next();
});
app.use(async (ctx: UnifyContext, next) => {
  // 加挂logger
  ctx.config = config;
  await next();
});

app.use(cors({ credentials: true, origin: '*' }));
app.use(bodyParser());
app.use(
  session(
    {
      key: 'acme.sess',
      maxAge: 3600000, // 1 hour life of cookie (ms)
      secure: false,
      signed: true,
    },
    app,
  ),
);
middlewares.map(middleware => app.use(middleware()));

// 挂载路由
app.use(router.routes()).use(router.allowedMethods());

export default app;

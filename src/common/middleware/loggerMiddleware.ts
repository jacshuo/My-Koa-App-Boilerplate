import {IConfig} from "../../app/config";
import winston, {format, transports} from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import {Context, Middleware, Next} from "koa";
import {UnifyContext, UnifyMiddleware} from "app";

const createLogger = (config: IConfig): any => {
  const logger = winston.createLogger({
    level: config.debug ? "debug" : "info",
    format: format.combine(
        format.label({label: "FILE-LOG"}),
        format.timestamp({
          format: "YYYY-MM-DD HH:mm:ss.SSS",
        }),
        format.printf(({level, message, label, timestamp}) => {
          return `${timestamp} [${label}] ${level}: ${message}`;
        }),
    ),
    transports: [
      new DailyRotateFile({
        json: config.logJSONFormat,
        datePattern: config.logDatePattern,
        filename: config.logFileName,
        zippedArchive: config.logZipArchive,
        dirname: config.logFileDir,
        maxSize: config.logMaxSize + "m",
        maxFiles: config.logMaxFiles,
      }),
      new transports.Console({
        format: format.combine(
            format.label({label: "CONSOLE-LOG"}),
            format.timestamp(),
            format.colorize(),
            format.printf(({level, message, label, timestamp}) => {
              return `${timestamp} [${label}] ${level}: ${message}`;
            }),
        ),
      }),
    ],
  });
  return logger;
};

const loggerMiddleware = (winston: any): UnifyMiddleware => {
  return async (ctx: UnifyContext, next: Next): Promise<void> => {
    const start = new Date().getTime();
    // 绑定Logger至Ctx
    ctx.logger = createLogger(ctx.config);
    ctx.logger.log("debug",
        `【请求开始--->>>】【请求方法: ${ctx.method}】【请求URL: ${ctx.originalUrl}】【请求数据: ${ctx.body}】`);
    try {
      await next();
    } catch (err: any) {
      ctx.status = err.status || 500;
      ctx.body = err.message;
    }
    const ms = new Date().getTime() - start;
    let logLevel: string;
    if (ctx.status >= 500) {
      logLevel = "error";
    } else if (ctx.status >= 400) {
      logLevel = "warn";
    } else {
      logLevel = "info";
    }
    const msg = `【请求结束<<<---】【请求方法: ${ctx.method}】
    【访问URL: ${ctx.originalUrl}】【响应码: ${ctx.status}】
    【响应体: ${ctx.body}】【请求耗时: ${ms}ms】`;
    ctx.logger.log(logLevel, msg);
  };
};

export default loggerMiddleware;

import { UnifyContext, UnifyMiddleware } from 'app';
import { Next } from 'koa';
import winston, { format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import { IConfig } from 'app/config';

const createLogger = (config: IConfig): any =>
  winston.createLogger({
    level: config.debug ? 'debug' : 'info',
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
        json: config.logJSONFormat,
        datePattern: config.logDatePattern,
        filename: config.logFileName,
        zippedArchive: config.logZipArchive,
        dirname: config.logFileDir,
        maxSize: `${config.logMaxSize}m`,
        maxFiles: config.logMaxFiles,
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

const loggerMiddleware =
  (): UnifyMiddleware =>
  async (ctx: UnifyContext, next: Next): Promise<void> => {
    const start = new Date().getTime();
    console.log(ctx);
    // 绑定Logger至Ctx
    ctx.logger = createLogger(ctx.config);
    ctx.logger.log('debug', `REQUEST:${ctx}:[${ctx.method}]:${ctx.originalUrl}`);
    try {
      await next();
    } catch (err: any) {
      ctx.status = err.status || 500;
      ctx.body = err.message;
    }
    const ms = new Date().getTime() - start;
    let logLevel: string;
    if (ctx.status >= 500) {
      logLevel = 'error';
    } else if (ctx.status >= 400) {
      logLevel = 'warn';
    } else {
      logLevel = 'info';
    }
    const msg = `RESPONSE:${ctx.status} in ${ms}ms`;
    ctx.logger.log(logLevel, msg);
  };

export default loggerMiddleware;

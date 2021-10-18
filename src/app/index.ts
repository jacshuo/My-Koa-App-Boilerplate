import Koa, {DefaultContext, DefaultState, Middleware} from "koa";
import bodyParser from "koa-bodyparser";
import logger from "../common/logger";
import winston, {Logger} from "winston";
import cors from "@koa/cors";
import middlewares from "../common/middleware";
import router from "../router";

const app = new Koa<DefaultState, DefaultContext>({});
app.use(cors());
app.use(bodyParser());
app.use(logger(winston));
middlewares.map((middleware) => {
  app.use(middleware());
});
app.use(router.routes()).use(router.allowedMethods());

export default app;

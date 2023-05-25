import Router from "@koa/router";
import {DefaultContext, DefaultState} from "koa";
import {UnifyContext} from "@src/app";
import * as controllers from "@src/controller";

const router = new Router<DefaultState, UnifyContext | DefaultContext>();

router.get("/", controllers.IndexController);


export default router;

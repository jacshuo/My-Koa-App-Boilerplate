import Router from "@koa/router";
import {DefaultContext, DefaultState} from "koa";
import {UnifyContext} from "app";
import * as controllers from "controller";

const router = new Router<DefaultState, UnifyContext | DefaultContext>();

router.get("/", controllers.IndexController);


export default router;

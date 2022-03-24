import Router from "@koa/router";
import * as controllers from "../controller";
import {DefaultContext, DefaultState} from "koa";
import {UnifyContext} from "app";

const router = new Router<DefaultState, UnifyContext | DefaultContext>();

router.get("/", controllers.IndexController);

export default router;

import Router from "koa-router";
import * as controllers from "../controller";

const router = new Router();

router.get("/", controllers.IndexController);

export default router;

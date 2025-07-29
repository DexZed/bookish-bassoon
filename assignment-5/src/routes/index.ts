import { Router } from "express";
import IndexRoute from "../public";
import userRoute from "../User Module/user.route";

type RouteDefinition = {
  path: string;
  controller: Router;
};
const GLOBAL_PREFIX = "/api/v1";

const routes: RouteDefinition[] = [{ path: "/", controller: IndexRoute },{
  path: `${GLOBAL_PREFIX}/users`,
  controller: userRoute,
}];

export default routes;

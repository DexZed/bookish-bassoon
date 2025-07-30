import { Router } from "express";
import IndexRoute from "../public";
import userRoute from "../User Module/user.route";
import authRoute from "../authorization module/auth.route";

type RouteDefinition = {
  path: string;
  controller: Router;
};
const GLOBAL_PREFIX = "/api/v1";

const routes: RouteDefinition[] = [
  { path: "/", controller: IndexRoute },
  {
    path: `${GLOBAL_PREFIX}/users`,
    controller: userRoute,
  },
  {
    path: `${GLOBAL_PREFIX}/auth`,
    controller: authRoute,
  },
];

export default routes;

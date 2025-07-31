import { RequestHandler, Router } from "express";
import IndexRoute from "../public";
import userRoute from "../User Module/user.route";
import authRoute from "../authorization module/auth.route";
import jwtVerify from "../middleware/jwt.validation";

type RouteDefinition = {
  path: string;
  controller: Router;
  middleware?: Array<RequestHandler>;
};
const GLOBAL_PREFIX = "/api/v1";

const routes: RouteDefinition[] = [
  { path: "/", controller: IndexRoute },
  
  {
    path: `${GLOBAL_PREFIX}/auth`,
    controller: authRoute,
  },
  {
    path: `${GLOBAL_PREFIX}/users`,
    middleware:[jwtVerify],
    controller: userRoute,
  },
];

export default routes;

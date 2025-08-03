import type { RequestHandler, Router } from "express";

import authRoute from "../authorization module/auth.route";
import jwtVerify from "../middleware/jwt.validation";
import parcelRoute from "../parcel module/parcel.route";
import IndexRoute from "../public";
import refreshTokenRoute from "../refresh token module/reftok.route";
import userRoute from "../User Module/user.route";

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
    path: `${GLOBAL_PREFIX}/refresh`,
    controller: refreshTokenRoute,
  },
  {
    path: `${GLOBAL_PREFIX}/users`,
    middleware: [jwtVerify],
    controller: userRoute,
  },
  {
    path: `${GLOBAL_PREFIX}/parcel`,
    middleware: [jwtVerify],
    controller: parcelRoute,
  },
];

export default routes;

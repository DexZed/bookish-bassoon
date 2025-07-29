import { Router } from "express";
import IndexRoute from "../public";

type RouteDefinition = {
  path: string;
  controller: Router;
};

const routes: RouteDefinition[] = [{ path: "/", controller: IndexRoute }];

export default routes;

import { Router } from "express";

import verifyRoles from "../../middleware/verify.roles";
import { allowedUserRoles } from "../../utils/interfaces";
import { UserController } from "./user.controller";

class UserRoute {
  private readonly usercontroller: UserController;
  public readonly router: Router;

  constructor() {
    this.usercontroller = new UserController();
    this.router = Router();
    this.initRoutes();
  }

  private initRoutes(): void {
    this.router.get("/", verifyRoles(allowedUserRoles.admin), this.usercontroller.findAll);
    this.router.patch("/block/:id", verifyRoles(allowedUserRoles.admin), this.usercontroller.blockUser);
    this.router.patch("/unblock/:id", verifyRoles(allowedUserRoles.admin), this.usercontroller.unblockUser);
  }
}

export default new UserRoute().router;

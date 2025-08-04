import { Router } from "express";

import { validateData } from "../../middleware/zod.validation";
import AuthController from "./auth.controller";
import { createUserDTO } from "./userDTOs/user.DTO";

class AuthRoute {
  private readonly authController: AuthController;
  public readonly router: Router;

  constructor() {
    this.authController = new AuthController();
    this.router = Router();
    this.initRoutes();
  }

  private initRoutes(): void {
    this.router.post("/register", validateData(createUserDTO), this.authController.registerUser);
    this.router.post("/login", this.authController.loginUser);
    this.router.get("/logout", this.authController.logout); // <--- Needs to be before the dynamic get route
    this.router.get("/:email", this.authController.getUser);
  }
}

export default new AuthRoute().router;

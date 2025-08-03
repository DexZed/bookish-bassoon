import { Router } from "express";

import RefreshTokenController from "./reftok.controller";

class RefreshTokenRoute {
  private readonly refreshTokenController: RefreshTokenController;
  public readonly router: Router;
  constructor() {
    this.refreshTokenController = new RefreshTokenController();
    this.router = Router();
    this.initRoutes();
  }

  private initRoutes(): void {
    this.router.get("/", this.refreshTokenController.getRefreshToken);
  }
}

export default new RefreshTokenRoute().router;

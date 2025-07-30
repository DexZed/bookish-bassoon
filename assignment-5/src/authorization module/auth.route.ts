import { Router } from "express";
import AuthController from "./auth.controller";


class AuthRoute {
    private readonly authController: AuthController;
    public readonly router: Router;
  
    constructor() {
        this.authController = new AuthController();
        this.router = Router();
        this.initRoutes();
    }
    private initRoutes():void {
        this.router.post('/register',this.authController.registerUser);
        this.router.post("/login",this.authController.loginUser);
        this.router.get("/:email",this.authController.getUser)
    }
}

export default new AuthRoute().router;
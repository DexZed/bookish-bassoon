import { Router } from "express";
import { UserController } from "./user.controller";
import jwtVerify from "../middleware/jwt.validation";


class UserRoute{
    
    private readonly usercontroller: UserController;
    public readonly router: Router;

    constructor(){
        this.usercontroller = new UserController();
        this.router = Router();
        this.initRoutes();
    
    }
    private initRoutes(): void {
        this.router.get('/',jwtVerify,this.usercontroller.findAll);
        // this.router.post('/',this.usercontroller.createUser);
        this.router.patch('/block/:id',jwtVerify,this.usercontroller.blockUser);
        this.router.patch('/unblock/:id',jwtVerify,this.usercontroller.unblockUser);
    }


}

export default new UserRoute().router;
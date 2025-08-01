import { Router } from "express";
import ParcelController from "./parcel.controller";
import verifyRoles from "../middleware/verify.roles";
import { allowedUserRoles } from "../utils/interfaces";

class ParcelRoute {
    private readonly parcelController: ParcelController;
    public readonly router: Router;
    
    constructor() {
      this.parcelController = new ParcelController();
      this.router = Router();
      this.initRoutes();
    }
    private initRoutes(): void {
      this.router.post("/",verifyRoles(allowedUserRoles.sender), this.parcelController.newParcel);
      this.router.get("/:id",verifyRoles(allowedUserRoles.sender), this.parcelController.getParcels);
      this.router.patch("/cancel/:id",verifyRoles(allowedUserRoles.sender), this.parcelController.cancelParcel);
      this.router.get("/status/:id",verifyRoles(allowedUserRoles.sender), this.parcelController.getStatusLog);
    }
}

export default new ParcelRoute().router;
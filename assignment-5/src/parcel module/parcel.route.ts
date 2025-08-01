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
      this.router.post("/sender",verifyRoles(allowedUserRoles.sender), this.parcelController.newParcel);
      this.router.get("/sender/:id",verifyRoles(allowedUserRoles.sender), this.parcelController.getParcels);
      this.router.patch("/sender/cancel/:id",verifyRoles(allowedUserRoles.sender), this.parcelController.cancelParcel);
      this.router.get("/sender/status/:id",verifyRoles(allowedUserRoles.sender), this.parcelController.getStatusLog);
      this.router.get("/receiver/:id",verifyRoles(allowedUserRoles.receiver), this.parcelController.getParcelsByReceiver);
      this.router.patch("/receiver/confirm/:id", verifyRoles(allowedUserRoles.receiver), this.parcelController.confirmParcelByReceiver);
      this.router.get("/receiver/history", verifyRoles(allowedUserRoles.receiver), this.parcelController.getParcelHistory);
    }
}

export default new ParcelRoute().router;
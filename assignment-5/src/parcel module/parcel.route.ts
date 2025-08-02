import { Router } from "express";
import ParcelController from "./parcel.controller";
import verifyRoles from "../middleware/verify.roles";
import { allowedUserRoles } from "../utils/interfaces";
import { validateData } from "../middleware/zod.validation";
import  { createParcelDTO, statusLogDTO } from "./parcel DTO/parcel.DTO";
class ParcelRoute {
    private readonly parcelController: ParcelController;
    public readonly router: Router;
    
    constructor() {
      this.parcelController = new ParcelController();
      this.router = Router();
      this.initRoutes();
    }
    private initRoutes(): void {
      this.router.post("/sender",validateData(createParcelDTO),verifyRoles(allowedUserRoles.sender), this.parcelController.newParcel);
      this.router.get("/sender/:id",verifyRoles(allowedUserRoles.sender), this.parcelController.getParcels);
      this.router.patch("/sender/cancel/:id",verifyRoles(allowedUserRoles.sender), this.parcelController.cancelParcel);
      this.router.get("/sender/status/:id",verifyRoles(allowedUserRoles.sender), this.parcelController.getStatusLog);
      /**
       * receiver
       */
      this.router.get("/receiver/history", verifyRoles(allowedUserRoles.receiver), this.parcelController.getParcelHistory);
      this.router.get("/receiver/:id",verifyRoles(allowedUserRoles.receiver), this.parcelController.getParcelsByReceiver);
      this.router.patch("/receiver/confirm/:id", verifyRoles(allowedUserRoles.receiver), this.parcelController.confirmParcelByReceiver);
      /**
       * admin
       */
      this.router.get("/admin", verifyRoles(allowedUserRoles.admin), this.parcelController.getParcelsByAdmin);
      this.router.patch("/admin/block/:id", verifyRoles(allowedUserRoles.admin), this.parcelController.blockParcel);
      this.router.patch("/admin/unblock/:id", verifyRoles(allowedUserRoles.admin), this.parcelController.unBlockParcel)
      this.router.patch("/admin/status-log/:id",validateData(statusLogDTO), verifyRoles(allowedUserRoles.admin), this.parcelController.updateParcelStatus)
      
    }
}

export default new ParcelRoute().router;
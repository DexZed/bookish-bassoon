import type { Request, Response } from "express";

import { Router } from "express";

import Parcel from "../modules/parcel module/parcelSchema/parcel.schema";
import asyncHandler from "../utils/asynchandler";
import User from "../modules/User Module/userEntity/entity";
import { NotFoundException } from "../global-handler/httpexception";

class IndexRoute {
  public readonly router: Router;
  constructor() {
    this.router = Router();
    this.configureRoutes();
  }

  private configureRoutes(): void {
    this.router.get("/", (_: Request, res: Response) => {
      res.json({ message: "Hello World" });
    });
    this.router.get(
      "/track/:id",
      asyncHandler(async (req: Request, res: Response) => {
        const parcelId = req.params.id;
        const parcel = await Parcel.find({ trackingId: parcelId });

        // console.log(parcel);
        if (!parcel) {
          return res.status(404).json({ message: "Parcel not found" });
        }
        res.json({
          message: "Parcel fetched successfully",
          parcel,
        });
      })
    );
    this.router.get(
      "/user/:id",
      asyncHandler(async (req: Request, res: Response) => {
        const userId = req.params.id;
        const users = await User.find({ userId });

        if (!users || users.length === 0) {
          throw new NotFoundException("User not found") ;
        }

        const filteredData = users.map(({ password, ...rest }) => rest);

        res.json({
          message: "User fetched successfully",
          filteredData,
        });
      })
    );
  }
}

export default new IndexRoute().router;

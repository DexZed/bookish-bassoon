import type { Request, Response } from "express";
import { Router } from "express";
import Parcel from "../modules/parcel module/parcelSchema/parcel.schema";
import asyncHandler from "../utils/asynchandler";
import User from "../modules/User Module/userEntity/entity";
import { NotFoundException } from "../global-handler/httpexception";
import mongoose from "mongoose";
class IndexRoute {
  public readonly router: Router;
  constructor() {
    this.router = Router();
    this.configureRoutes();
  }

  private configureRoutes(): void {
    this.router.get(
      "/search-parcels",
      asyncHandler(async (req: Request, res: Response) => {
        const { trackingId, sender, receiver, status } = req.query;

        // Sorting sanitization
        const sortDateParam = (
          req.query.createdAt as string | undefined
        )?.toLowerCase();
        const sortDate: 1 | -1 =
          sortDateParam === "asc" || sortDateParam === "1" ? 1 : -1;

        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 3;
        const skip = (page - 1) * limit;

        // Build dynamic query
        let query: Record<string, any> = {};
        if (trackingId) query.trackingId = trackingId;
        if (sender)
          query.sender = new mongoose.Types.ObjectId(sender as string);
        if (receiver)
          query.receiver = new mongoose.Types.ObjectId(receiver as string);
        if (status) query.status = status;
        console.log(query);
        const parcels = await Parcel.find(query)
          .skip(skip)
          .limit(limit)
          .sort({ createdAt: sortDate });

        res.json({
          message: "Parcels fetched successfully",
          page,
          limit,
          total: parcels.length,
          parcels,
        });
      })
    );

    this.router.get(
      "/user/:identifier",
      asyncHandler(async (req: Request, res: Response) => {
        const { identifier } = req.params;

        console.log("Identifier received:", identifier);

        let user;

        if (mongoose.isValidObjectId(identifier)) {
          // fetch by MongoDB _id
          user = await User.findById(identifier).lean();
        } else {
          // fetch by email
          user = await User.findOne({ email: identifier }).lean();
        }

        if (!user) {
          throw new NotFoundException("User not found");
        }

        const { password, ...filteredUser } = user;

        res.json({
          message: "User fetched successfully",
          user: filteredUser,
        });
      })
    );
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
  }
}

export default new IndexRoute().router;

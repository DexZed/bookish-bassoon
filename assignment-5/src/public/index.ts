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
        const { trackingId, sender, receiver, status, sort } = req.query;

        // Sorting sanitization
        const sortParam = (req.query.sort as string | undefined)?.toLowerCase();
        const sortOrder: 1 | -1 = sortParam === "asc" ? 1 : -1;
        const page = parseInt(req.query.page as string) || 0;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = page * limit;

        // Build dynamic query
        let query: Record<string, any> = {};
        if (trackingId)
          query.trackingId = { $regex: trackingId, $options: "i" };
        if (sender)
          query.sender = new mongoose.Types.ObjectId(sender as string);
        if (receiver)
          query.receiver = new mongoose.Types.ObjectId(receiver as string);
        if (status) query.status = status;

        const [parcels, totalParcels] = await Promise.all([
          Parcel.find(query)
            .sort({ createdAt: sortOrder }) // Use the corrected sortOrder
            .skip(skip)
            .limit(limit),
          // CHANGE 4: Get the *actual total count* of documents matching the filter.
          Parcel.countDocuments(query),
        ]);
        const hasNextPage = skip + parcels.length < totalParcels;
        res.json({
          message: "Parcels fetched successfully",
          // CHANGE 6: Send back the data structure the frontend expects.
          parcels,
          total: totalParcels,
          nextCursor: hasNextPage ? page + 1 : null, // Send next page number or null
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

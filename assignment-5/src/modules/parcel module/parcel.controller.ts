import type { Request, Response } from "express";

import type { RequestExtend } from "../../types";
import type { ParcelSearchDTO } from "../../utils/utility";

import asyncHandler from "../../utils/asynchandler";
import ParcelService from "./parcel.service";

export default class ParcelController {
  private readonly parcelService: ParcelService;

  constructor() {
    this.parcelService = new ParcelService();
  }

  // sender api calls
  newParcel = asyncHandler(async (req: RequestExtend, res: Response) => {
    if (req.user?.role !== "sender") {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const data = req.body;
    const parcel = await this.parcelService.createParcel(req, data);
    res.status(201).json({ message: "Parcel created successfully", parcel });
  });

  cancelParcel = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const parcel = await this.parcelService.cancelParcel(id);
    res.status(200).json({ message: "Parcel cancelled successfully", parcel });
  });

  getParcels = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const parcels = await this.parcelService.getParcels(id);
    res.status(200).json({ message: "Parcels fetched successfully", parcels });
  });

  getStatusLog = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const parcel = await this.parcelService.getParcelStatusLog(id);
    res
      .status(200)
      .json({ message: "Parcel status log fetched successfully", parcel });
  });

  // receiver api calls
  getParcelsByReceiver = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const parcels = await this.parcelService.getParcelsByReceiver(id);
    res.status(200).json({ message: "Parcels fetched successfully", parcels });
  });

  confirmParcelByReceiver = asyncHandler(
    async (req: Request, res: Response) => {
      const { id } = req.params;
      const data = req.body;
      const parcel = await this.parcelService.confirmParcel(id, data);
      res
        .status(200)
        .json({ message: "Parcel confirmed successfully", parcel });
    },
  );

  getParcelHistory = asyncHandler(async (req: Request, res: Response) => {
    const { receiver, status } = req.query;

    if (!receiver)
      return res.status(400).json({ message: "receiver is required" });

    const parcels = await this.parcelService.getParcelHistory(
      receiver as string,
      status as string,
    );
    res.status(200).json({ message: "Parcels fetched successfully", parcels });
  });

  // admin api calls
  getParcelsByAdmin = asyncHandler(async (_: Request, res: Response) => {
    const parcels = await this.parcelService.getAllParcels();
    res.status(200).json({ message: "Parcels fetched successfully", parcels });
  });

  blockParcel = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const parcel = await this.parcelService.blockParcel(id);
    res.status(200).json({ message: "Parcel blocked successfully", parcel });
  });

  unBlockParcel = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const parcel = await this.parcelService.unblockParcel(id);
    res.status(200).json({ message: "Parcel unblocked successfully", parcel });
  });

  updateParcelStatus = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, location, note } = req.body;
    // console.log("parcel status update fields", id, status, location, note);
    const parcel = await this.parcelService.updateParcelStatus(
      id,
      status,
      location,
      note,
    );
    res
      .status(200)
      .json({ message: "Parcel status updated successfully", parcel });
  });

  getSearchedParcels = asyncHandler(async (req: Request, res: Response) => {
    const filters = req.query;
    const parcels = await this.parcelService.searchParcels(filters as ParcelSearchDTO);
    res.status(200).json({ message: "Parcels fetched successfully", parcels });
  });
}

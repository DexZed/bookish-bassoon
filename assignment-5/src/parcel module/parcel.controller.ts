import asyncHandler from "../utils/asynchandler";
import ParcelService from "./parcel.service";
import { Request, Response } from "express";
export default class ParcelController {
  private readonly parcelService: ParcelService;

  constructor() {
    this.parcelService = new ParcelService();
  }
  newParcel = asyncHandler(async (req: Request, res: Response) => {
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
}

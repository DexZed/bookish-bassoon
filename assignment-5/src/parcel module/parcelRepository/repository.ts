import mongoose from "mongoose";

import type { ParcelSearchDTO } from "../../utils/utility";
import type { CreateParcelDTO } from "../parcel DTO/parcel.DTO";
import type { IParcel } from "../parcelSchema/parcel.schema";

import { GenericRepository } from "../../Base Repository/generic.repository";
import Parcel from "../parcelSchema/parcel.schema";

export default class ParcelRepository extends GenericRepository<IParcel> {
  constructor() {
    super(Parcel);
  }

  async createParcel(parcel: Partial<CreateParcelDTO>): Promise<IParcel> {
    return await Parcel.create(parcel);
  }

  async getParcelsByUser(userId: CreateParcelDTO["sender"]): Promise<IParcel[]> {
    const parcels = await Parcel.find({ sender: userId });
    return parcels;
  }

  async cancelParcel(id: string): Promise<IParcel | null> {
    const parcel = await Parcel.findByIdAndUpdate(id, { status: "Cancelled" });
    return parcel;
  }

  async getParcelStatusLog(id: string): Promise<IParcel | null> {
    const parcel = await Parcel.findById(id);
    return parcel;
  }

  // receiver parcel api route definiions
  async getParcelsByReceiver(userId: CreateParcelDTO["receiver"]): Promise<IParcel[]> {
    const parcels = await Parcel.find({ receiver: userId, status: { $in: ["In Transit", "Dispatched"] } });
    return parcels;
  }

  async getParcelHistory(receiverId: CreateParcelDTO["receiver"], status: CreateParcelDTO["status"]): Promise<IParcel[]> {
    if (!mongoose.Types.ObjectId.isValid(receiverId)) {
      throw new Error("Invalid receiver ID");
    }
    const receiver = new mongoose.Types.ObjectId(receiverId);
    const parcels = await Parcel.find({ receiver, status });
    return parcels;
  }

  // search percels by multi query
  async searchParcels(filters: ParcelSearchDTO): Promise<IParcel[]> {
    const query: any = {};

    if (filters.trackingId) {
      query.trackingId = { $regex: filters.trackingId, $options: "i" }; // case-insensitive search
    }

    if (filters.status) {
      query.status = Array.isArray(filters.status)
        ? { $in: filters.status }
        : filters.status;
    }

    if (filters.startDate || filters.endDate) {
      query.createdAt = {};
      if (filters.startDate)
        query.createdAt.$gte = new Date(filters.startDate);
      if (filters.endDate)
        query.createdAt.$lte = new Date(filters.endDate);
    }

    if (filters.senderId) {
      query.sender = filters.senderId;
    }

    if (filters.receiverId) {
      query.receiver = filters.receiverId;
    }

    return await Parcel.find(query);
  }
}

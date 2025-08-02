import mongoose, { ObjectId } from "mongoose";
import { GenericRepository } from "../../Base Repository/generic.repository";
import Parcel, { IParcel } from "../parcelSchema/parcel.schema";
import { CreateParcelDTO } from "../parcel DTO/parcel.DTO";



export default class ParcelRepository extends GenericRepository<IParcel> {
  constructor() {
    super(Parcel);
  }
  async createParcel(parcel: Partial<CreateParcelDTO>): Promise<IParcel>{
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
    const parcels = await Parcel.find({ receiver: userId });
    return parcels;
  
  }
  async getParcelHistory(receiverId: CreateParcelDTO["receiver"], status: CreateParcelDTO["status"]): Promise<IParcel[]> {
      if (!mongoose.Types.ObjectId.isValid(receiverId)) {
    throw new Error("Invalid receiver ID");
  }
    const receiver = new mongoose.Types.ObjectId(receiverId);
    const parcels = await Parcel.find({receiver,status});
    return parcels;
  
  }
}
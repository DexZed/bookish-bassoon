import mongoose, { ObjectId } from "mongoose";
import { GenericRepository } from "../../Base Repository/generic.repository";
import Parcel, { IParcel } from "../parcelSchema/parcel.schema";



export default class ParcelRepository extends GenericRepository<IParcel> {
  constructor() {
    super(Parcel);
  }
  async createParcel(parcel: Partial<IParcel>): Promise<IParcel>{
    return await Parcel.create(parcel);
  }
  async getParcelsByUser(userId: string): Promise<IParcel[]> {
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
  async getParcelsByReceiver(userId: string): Promise<IParcel[]> {
    const parcels = await Parcel.find({ receiver: userId });
    return parcels;
  
  }
  async getParcelHistory(receiverId: string, status: string): Promise<IParcel[]> {
      if (!mongoose.Types.ObjectId.isValid(receiverId)) {
    throw new Error("Invalid receiver ID");
  }
    const receiver = new mongoose.Types.ObjectId(receiverId);
    const parcels = await Parcel.find({receiver,status});
    return parcels;
  
  }

}
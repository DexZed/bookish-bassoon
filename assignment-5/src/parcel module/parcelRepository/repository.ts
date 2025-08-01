import { GenericRepository } from "../../Base Repository/generic.repository";
import Parcel, { IParcel } from "../parcelSchema/parcel.schema";



export default class ParcelRepository extends GenericRepository<IParcel> {
  constructor() {
    super(Parcel);
  }
  async createParcel(parcel: Partial<IParcel>): Promise<IParcel>{
    return await Parcel.create(parcel);
  }
  async getParcelsByUser(userId: string) {
    const parcels = await Parcel.find({ sender: userId });
    return parcels;
  
  }
  async cancelParcel(id: string) {
    const parcel = await Parcel.findByIdAndUpdate(id, { status: "Cancelled" });
    return parcel;
  }
  async getParcelStatusLog(id: string) {
    const parcel = await Parcel.findById(id);
    return parcel;
  }

}
import { GenericRepository } from "../../Base Repository/generic.repository";
import Parcel, { IParcel } from "../parcelSchema/parcel.schema";



export default class ParcelRepository extends GenericRepository<IParcel> {
  constructor() {
    super(Parcel);
  }
  async getParcelsByUser(userId: string) {
    const parcels = await Parcel.find({ sender: userId });
    return parcels;
  
  }
  async cancelParcel(id: string) {
    const parcel = await Parcel.findByIdAndUpdate(id, { status: "cancelled" });
    return parcel;
  }
  async getParcelStatusLog(id: string) {
    const parcel = await Parcel.findById(id);
    return parcel;
  }

}
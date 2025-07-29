import { GenericRepository } from "../../Base Repository/generic.repository";
import Parcel, { IParcel } from "../parcelSchema/parcel.schema";



export default class ParcelRepository extends GenericRepository<IParcel> {
  constructor() {
    super(Parcel);
  }
}
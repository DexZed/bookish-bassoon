import { GenericRepository } from "../../Base Repository/generic.repository";
import Parcel, { IParcel } from "../parcelEntity/parcel.entity";


export default class ParcelRepository extends GenericRepository<IParcel> {
  constructor() {
    super(Parcel);
  }
}
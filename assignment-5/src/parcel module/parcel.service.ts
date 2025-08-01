import mongoose from "mongoose";
import ParcelRepository from "./parcelRepository/repository";
import { IParcel, IStatusLog } from "./parcelSchema/parcel.schema";


export default class ParcelService {
  private parcelRepository:ParcelRepository;
  constructor() {
    this.parcelRepository = new ParcelRepository();
  }
  // Sender Only api routes
async createParcel(parcel:IParcel):Promise<IParcel> {
    const newParcel = await this.parcelRepository.create(parcel);
    return newParcel;
}
async getParcels(id:string):Promise<IParcel[]| null> {
    const senderParcels = await this.parcelRepository.getParcelsByUser(id);
    return senderParcels;
}
async cancelParcel(id:string):Promise<IParcel| null>{
    const parcel = await this.parcelRepository.cancelParcel(id);
    if(!parcel){
        throw new Error("Parcel not found");
    }
    return parcel;
}
async getParcelStatusLog(id:string):Promise<IParcel| null>{
    const parcel = await this.parcelRepository.getParcelStatusLog(id);
    if(!parcel){
        throw new Error("Parcel not found");
    }
   
    return parcel;

}
}

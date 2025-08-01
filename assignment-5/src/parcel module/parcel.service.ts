import { RequestExtend } from "../types";
import { Response } from "express";
import ParcelRepository from "./parcelRepository/repository";
import { IParcel } from "./parcelSchema/parcel.schema";
import { trackIdGenerator } from "../utils/utility";

export default class ParcelService {
  private parcelRepository: ParcelRepository;
  constructor() {
    this.parcelRepository = new ParcelRepository();
  }
  // Sender Only api routes
  async createParcel(req: RequestExtend, _: Response): Promise<IParcel> {
    const trkID = trackIdGenerator();
    const parcel = req.body;

    const parceldata = { ...parcel, trackingId: trkID, status: "requested" };
    console.log("parcel data:", parceldata);

    const newParcel = await this.parcelRepository.create(parceldata);
    return newParcel;
  }
  async getParcels(id: string): Promise<IParcel[] | null> {
    const senderParcels = await this.parcelRepository.getParcelsByUser(id);
    return senderParcels;
  }
  async cancelParcel(id: string): Promise<IParcel | null> {
    const parcel = await this.parcelRepository.cancelParcel(id);
    if (!parcel) {
      throw new Error("Parcel not found");
    }
    return parcel;
  }
  async getParcelStatusLog(id: string): Promise<IParcel | null> {
    const parcel = await this.parcelRepository.getParcelStatusLog(id);
    if (!parcel) {
      throw new Error("Parcel not found");
    }

    return parcel;
  }
  // Receiver Only api routes
  async getParcelsByReceiver(id: string): Promise<IParcel[] | null> {
    const receiverParcels = await this.parcelRepository.getParcelsByReceiver(
      id
    );
    return receiverParcels;
  }
  async confirmParcel(id: string): Promise<IParcel | null> {
    const parcel = await this.parcelRepository.confirmParcel(id);
    if (!parcel) {
      throw new Error("Parcel not found");
    }
    return parcel;
  }
  async getParcelHistory(): Promise<IParcel[] | null> {
    const parcels = await this.parcelRepository.getParcelHistory();
    return parcels;
  }
}

import { RequestExtend } from "../types";
import { Response } from "express";
import ParcelRepository from "./parcelRepository/repository";
import {
  IParcel,
  IStatusLog,
} from "./parcelSchema/parcel.schema";
import { ParcelSearchDTO, trackIdGenerator } from "../utils/utility";
import { CreateParcelDTO, StatusLogDTO } from "./parcel DTO/parcel.DTO";
import { BadRequestException } from "../global-handler/httpexception";

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

    const invalidStatuses = new Set([
      "Requested",
      "Approved",
      "Dispatched",
      "In Transit",
    ]);
    if (invalidStatuses.has(parcel.status)) {
      throw new BadRequestException(
        `${parcel.status} status cannot be cancelled`
      );
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
  async confirmParcel(
    id: string,
    data: Partial<StatusLogDTO>
  ): Promise<IParcel | null> {
    const parcel = await this.parcelRepository.update(id, data);
    if (!parcel) {
      throw new Error("Parcel not found");
    }
    if (parcel.status !== "In Transit")
      throw new BadRequestException(
        "Only Parcel In Transit status can be confirmed"
      );
    return parcel;
  }
  async getParcelHistory(
    receiver: CreateParcelDTO["receiver"],
    status: CreateParcelDTO["status"]
  ): Promise<IParcel[] | null> {
    const parcels = await this.parcelRepository.getParcelHistory(
      receiver,
      status
    );
    return parcels;
  }
  // Admin Only api routes
  async getAllParcels(): Promise<IParcel[] | null> {
    const parcels = await this.parcelRepository.findAll();
    return parcels;
  }
  async updateParcelStatus(
    id: string,
    status: StatusLogDTO["status"],
    location?: StatusLogDTO["location"],
    note?: StatusLogDTO["note"]
  ): Promise<IParcel | null> {
    const parcel = await this.parcelRepository.findById(id);

    if (!parcel) {
      throw new Error("Parcel not found");
    }

    parcel.statusLogs.push({
      status,
      location,
      note,
    } as IStatusLog);

    await parcel.save();

    return parcel;
  }

  async blockParcel(id: string): Promise<IParcel | null> {
    const parcel = await this.parcelRepository.update(id, {
      isBlocked: true,
    });
    if (!parcel) {
      throw new Error("Parcel not found");
    }
    return parcel;
  }
  async unblockParcel(id: string): Promise<IParcel | null> {
    const parcel = await this.parcelRepository.update(id, {
      isBlocked: false,
    });
    if (!parcel) {
      throw new Error("Parcel not found");
    }
    return parcel;
  }

  async searchParcels(filters: ParcelSearchDTO): Promise<IParcel[]> {
    return await this.parcelRepository.searchParcels(filters);
  }
}

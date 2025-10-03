import type { Response } from "express";

import type { RequestExtend } from "../../types";
import type { ParcelSearchDTO } from "../../utils/utility";
import type { CreateParcelDTO, StatusLogDTO } from "./parcel DTO/parcel.DTO";
import type { IParcel } from "./parcelSchema/parcel.schema";

import { BadRequestException, NotFoundException } from "../../global-handler/httpexception";
import { trackIdGenerator } from "../../utils/utility";
import ParcelRepository from "./parcelRepository/repository";
import Parcel from "./parcelSchema/parcel.schema";

export default class ParcelService {
  private parcelRepository: ParcelRepository;
  constructor() {
    this.parcelRepository = new ParcelRepository();
  }

  // Sender Only api routes
  async createParcel(req: RequestExtend, _: Response): Promise<IParcel> {
    const trkID = trackIdGenerator();
    const parcel = req.body;
    const parceldata = { ...parcel, trackingId: trkID, status: "Requested" };
    // console.log("parcel data:", parceldata);

    const newParcel = await this.parcelRepository.create(parceldata);

    return newParcel;
  }

  async getParcels(id: string): Promise<IParcel[] | null> {
    const senderParcels = await this.parcelRepository.getParcelsByUser(id);
    return senderParcels;
  }

  async cancelParcel(id: string): Promise<IParcel | null> {
    const parcelData = await this.parcelRepository.findById(id);

    if (!parcelData) {
      throw new NotFoundException("Parcel not found");
    }

    const invalidStatuses = new Set(["Dispatched"]);
    if (invalidStatuses.has(parcelData.status)) {
      throw new BadRequestException(
        `${parcelData.status} status cannot be cancelled`,
      );
    }
    const parcel = await this.parcelRepository.cancelParcel(id);
    return parcel;
  }

  async getParcelStatusLog(id: string): Promise<IParcel | null> {
    const parcel = await this.parcelRepository.getParcelStatusLog(id);
    if (!parcel) {
      throw new NotFoundException("Parcel not found");
    }

    return parcel;
  }

  // Receiver Only api routes
  async getParcelsReceiver(id: string): Promise<IParcel[] | null> {

    // const receiverParcels = await this.parcelRepository.getParcelsByReceiver(
    //   id,
    // );
    const receiverParcels = await Parcel.find({
      receiver: id,
    });
    if (receiverParcels.length === 0) {
      throw new NotFoundException("No parcels found for this receiver or no parcel with 'In Transit' status found for this receiver yet");
    }
    return receiverParcels;
  }

  async confirmParcel(
    id: string,
    data: Partial<StatusLogDTO>,
  ): Promise<IParcel | null> {
    const findParcel = await this.parcelRepository.findById(id);
    if (!findParcel) {
      throw new NotFoundException("Parcel not found");
    }
    if (findParcel.status !== "In Transit") {
      throw new BadRequestException(
        "Only Parcel In Transit status can be confirmed",
      );
    }
    const parcel = await this.parcelRepository.update(id, data);
    return parcel;
  }

  async getParcelHistory(
    receiver: CreateParcelDTO["receiver"],
    status: CreateParcelDTO["status"],
  ): Promise<IParcel[] | null> {
    const parcels = await this.parcelRepository.getParcelHistory(
      receiver,
      status,
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
    note?: StatusLogDTO["note"],
  ): Promise<IParcel | null> {
    const parcel = await this.parcelRepository.findById(id);

    if (!parcel) {
      throw new NotFoundException("Parcel not found");
    }

    const parcelUpdated = await this.parcelRepository.updateStatusLogs(id, {
      status,
      location,
      note,
    });
    return parcelUpdated;
  }

  async blockParcel(id: string): Promise<IParcel | null> {
    
    const parcel = await this.parcelRepository.update(id, {
      isBlocked: true,
    });
    if (!parcel) {
      throw new NotFoundException("Parcel not found");
    }
    return parcel;
  }

  async unblockParcel(id: string): Promise<IParcel | null> {
    const parcel = await this.parcelRepository.update(id, {
      isBlocked: false,
    });
    if (!parcel) {
      throw new NotFoundException("Parcel not found");
    }
    return parcel;
  }

  async searchParcels(filters: ParcelSearchDTO): Promise<IParcel[]> {
    return await this.parcelRepository.searchParcels(filters);
  }
}


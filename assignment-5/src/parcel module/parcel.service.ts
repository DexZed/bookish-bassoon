import mongoose from "mongoose";
import { CreateParcelDTO } from "./parcelDTO/parcelDTO";
import ParcelEntity from "./parcelEntity/parcel.entity";
import ParcelRepository from "./parcelRepository/repository";

export default class ParcelService {
  private readonly parcelRepository: ParcelRepository;

  constructor() {
    this.parcelRepository = new ParcelRepository();
  }
  //TODO: senders only parcel creation
  async createParcel(createParcelDTO:CreateParcelDTO ): Promise<ParcelEntity> {
   
    const parcel = await this.parcelRepository.create({
        ...createParcelDTO,
        sender: new mongoose.Types.ObjectId(createParcelDTO.sender),
        receiver: new mongoose.Types.ObjectId(createParcelDTO.receiver),
    });
    return parcel;
  }
}


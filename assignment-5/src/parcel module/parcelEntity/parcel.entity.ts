import { ObjectId } from "mongoose";

export default interface ParcelEntity {
  trackingId: string;
  sender: ObjectId;
  receiver: ObjectId;
  type: "Document" | "Box" | "Fragile" | "Other";
  weight: number;
  pickupAddress: string;
  deliveryAddress: string;
  status: string;
  statusLogs: {
    status: "Requested" | "Approved" | "Dispatched" | "In Transit" | "Delivered" | "Cancelled" | "Returned";
    location: string;
    note: string;
  }[];
  fee: number;
  deliveryDate: Date;
  isBlocked: boolean;
}
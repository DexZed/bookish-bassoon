import type { ObjectId } from "mongoose";

type ParcelEntity = {
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
};
export default ParcelEntity;

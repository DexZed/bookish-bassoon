import mongoose, { HydratedDocument, ObjectId } from "mongoose";

export interface IStatusLogSchema {
  status:
    | "Requested"
    | "Approved"
    | "Dispatched"
    | "In Transit"
    | "Delivered"
    | "Cancelled"
    | "Returned";
  location?: string;
  note?: string;
}
export interface IStatusLog extends HydratedDocument<IStatusLogSchema> {}

const statusLogSchema = new mongoose.Schema<IStatusLog>(
  {
    status: {
      type: String,
      enum: [
        "Requested",
        "Approved",
        "Dispatched",
        "In Transit",
        "Delivered",
        "Cancelled",
        "Returned",
      ],
      required: true,
    },
    location: { type: String },
    note: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
    id: false,
  }
);

export  interface IParcelSchema {
  trackingId: string; // TRK-YYYYMMDD-xxxxxx
  sender: ObjectId; // User
  receiver: ObjectId; // User
  type: "Document" | "Box" | "Fragile" | "Other";
  weight: number;
  pickupAddress: string;
  deliveryAddress: string;
  status: string;
  statusLogs: IStatusLog[];
  fee: number;
  deliveryDate: Date;
  isBlocked: boolean;
}
export interface IParcel extends HydratedDocument<IParcelSchema> {}

const parcelSchema = new mongoose.Schema<IParcel>(
  {
    trackingId: { type: String, required: true, unique: true },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["Document", "Box", "Fragile", "Other"],
      required: true,
    },
    weight: { type: Number, required: true },
    pickupAddress: { type: String, required: true },
    deliveryAddress: { type: String, required: true },
    status: { type: String, required: true },
    statusLogs: [statusLogSchema],
    fee: { type: Number, required: true },
    deliveryDate: { type: Date, required: true },
    isBlocked: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Parcel = mongoose.model<IParcel>("Package", parcelSchema);
export default Parcel;
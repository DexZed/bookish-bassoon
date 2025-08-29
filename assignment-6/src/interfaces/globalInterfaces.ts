import { z } from "zod";
export const RegistrationSchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string().min(8),
  role: z.string(),
});
export type RegistrationFields = z.infer<typeof RegistrationSchema>;

export const ParcelSchema = z.object({
  receiver: z.string(),
  type: z.enum(["Document", "Box", "Fragile", "Other"]),
  weight: z.number(),
  pickupAddress: z.string(),
  deliveryAddress: z.string(),
  fee: z.number(),
  deliveryDate: z.date(),
});
export interface ParcelData {
  sender: string;
  receiver: string;
  type: string
  weight: number
  pickupAddress: string; 
  deliveryAddress: string;
  status: string;
  fee: number;
  deliveryDate: Date;
}
export type ParcelFields = z.infer<typeof ParcelSchema>;

export interface AuthState {
  id: string | null;
  name: string | null;
  email: string | null;
  role: string | null;
  isBlocked: boolean | null;
  accessToken: string | null;
}

export const LoginSchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string().min(6),
});
export type LoginFields = z.infer<typeof LoginSchema>;

// Interface for a single user object
export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  isBlocked: boolean;
  createdAt?: string;
  updatedAt?: string;
  refreshToken?:string;
}

// Interface for the entire response payload
export interface UsersResponse {
  message: string;
  users: User[];
}
export interface UserResponse {
  message: string;
  user: User;
}
//  Interface for Status Log
export interface StatusLog {
  status: string;
  location: string;
  note: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}
// Interface for Parcel
export interface Parcel {
  _id: string;
  trackingId: string;
  sender: string;
  receiver: string;
  type: string;
  weight: number;
  pickupAddress: string;
  deliveryAddress: string;
  status: string;
  fee: number;
  deliveryDate: string;
  isBlocked: boolean;
  createdAt: string;
  updatedAt: string;
  statusLogs: StatusLog[];
}
// Interface for parcel Response
export interface ParcelsResponse {
  message: string;
  parcels: Parcel[];
}
export interface UpdateStatusBody {
  status: string;
  location?: string;
  note?: string;
}

 export interface UpdateStatusResponse {
  message: string;
  updatedParcel: Parcel; // reuse the Parcel interface from before
}

export interface ParcelResponse {
  message: string;
  parcel: Parcel;
}
export const  StatusLogSchema = z.object({
  status: z.string(),
  location: z.string(),
  note: z.string()
  
}) 
export type StatusLogFields = z.infer<typeof StatusLogSchema>;
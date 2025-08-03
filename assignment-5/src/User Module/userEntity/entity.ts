import type { HydratedDocument } from "mongoose";

import mongoose from "mongoose";

export type IUserSchema = {
  name: string;
  email: string;
  password: string;
  role: "admin" | "sender" | "receiver";
  isBlocked: boolean;
  refreshToken: string;

};

export type IUSer = {
} & HydratedDocument<IUserSchema>;

const userSchema = new mongoose.Schema<IUSer>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "sender", "receiver"], required: true },
  isBlocked: { type: Boolean, default: false },
  refreshToken: { type: String, default: "" },
}, {
  timestamps: true,
  versionKey: false,
});

const User = mongoose.model<IUSer>("User", userSchema);
export default User;

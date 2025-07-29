import mongoose, { HydratedDocument, ObjectId } from "mongoose";

export interface IUserSchema {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'sender' | 'receiver';
  isBlocked: boolean;
  createdAt: Date;
}

export interface IUSer extends HydratedDocument<IUserSchema> {
}

const userSchema = new mongoose.Schema<IUSer>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'sender', 'receiver'], required: true },
    isBlocked: { type: Boolean, default: false },
},{
    timestamps: true,
    versionKey:false
})
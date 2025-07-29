import mongoose, { HydratedDocument, Types } from "mongoose";
// User Entity
export interface IUSerSchema{
    name: string;
    email: string;
    password:string;
    role:Role;
    IsActive:IsActive;
    auths: IAuthProvider[];
    bookings:Types.ObjectId[]
    refreshToken:String
}


export interface IUSer extends HydratedDocument<IUSerSchema> {
}

export enum IsActive{
    ACTIVE='ACTIVE',
    INACTIVE='INACTIVE',
    BLOCKED='BLOCKED'
}
 export enum Role {
    SUPERUSER= "super_user",
    ADMIN = 'admin',
    USER = 'user',

 }
export interface IAuthProvider {
    provider:string,
    providerID:string,
}
// Auth Provider schema without ID since its an embedded schema into user
const authScehma = new mongoose.Schema<IAuthProvider>({
        provider:String,
        providerID:String,
},
{
    versionKey:false,
    _id:false
})
// Add contraints to these later
const userSchema = new mongoose.Schema<IUSer>({
    name: String,
    email: String,
    password: String,
    role: {
        type: String,
        enum: Object.values(Role),
        default:Role.USER
    },
    IsActive: {
        type: String,
        enum: Object.values(IsActive),
        default:IsActive.ACTIVE
    },
    auths:[authScehma],
    refreshToken:String
},
{
    timestamps: true,
    versionKey:false
})

export const User = mongoose.model<IUSer>('User', userSchema);
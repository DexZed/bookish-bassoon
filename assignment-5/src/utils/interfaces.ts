export const allowedUserRoles = {
  admin: "admin",
  sender: "sender",
  receiver: "receiver",

};

export interface UserData {
  _id: string,
  name: string,
  email: string,
  password: string,
  role: string,
  isBlocked: boolean,
  refreshToken: string,
}

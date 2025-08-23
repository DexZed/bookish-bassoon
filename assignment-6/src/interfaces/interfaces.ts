import { z } from "zod";
export const RegistrationSchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string().min(8),
  role: z.string(),
});
export type RegistrationFields = z.infer<typeof RegistrationSchema>;

export const ParcelSchema = z.object({
    sender: z.string(),
    receiver: z.string(),
    type: z.enum(["Document", "Box", "Fragile", "Other"]),
    weight: z.number(),
    pickupAddress: z.string(),
    deliveryAddress: z.string(),
    fee: z.number(),
    deliveryDate: z.date(),
})
export type ParcelFields = z.infer<typeof ParcelSchema>;
// {
//         "name": "Admin",
//         "email": "Admin@gmail.com",
//         "role": "admin",
//         "isBlocked": false,
//         "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IkFkbWluIiwiZW1haWwiOiJBZG1pbkBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NTU5NTA3NzEsImV4cCI6MTc1NTk1NDM3MX0.SjHWApuhr59qgLTF2W9rPRrOSOX5HMQq8Cv8KPw9Clw"
//     }

export interface AuthState {
  name: string;
  email: string;
  role: string;
  isBlocked: boolean;
  accessToken: string;
}
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
});
export type ParcelFields = z.infer<typeof ParcelSchema>;
export interface AuthState {
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
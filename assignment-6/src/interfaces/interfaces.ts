import { z } from "zod";
export const RegistrationSchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string().min(8),
  role: z.string(),
});
export type RegistrationFields = z.infer<typeof RegistrationSchema>;
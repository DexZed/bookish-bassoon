import { z } from "zod";

export const createUserDTO = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(["admin", "sender", "receiver"]),
  isBlocked: z.boolean().default(false),
  refreshToken: z.string().default(""),
});

export type CreateUser = z.infer<typeof createUserDTO>;

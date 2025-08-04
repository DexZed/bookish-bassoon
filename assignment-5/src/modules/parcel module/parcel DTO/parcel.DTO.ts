import { z } from "zod";

export const statusLogDTO = z.object({
  status: z
    .enum([
      "Requested",
      "Approved",
      "Dispatched",
      "In Transit",
      "Delivered",
      "Cancelled",
      "Returned",
    ])
    .optional(),
  location: z.string().optional(),
  note: z.string().optional(),
});

export type StatusLogDTO = z.infer<typeof statusLogDTO>;

export const createParcelDTO = z.object({
  trackingID: z.string().optional(),
  sender: z.string(),
  receiver: z.string(),
  type: z.enum(["Document", "Box", "Fragile", "Other"]),
  weight: z.number(),
  pickupAddress: z.string(),
  deliveryAddress: z.string(),
  status: z.string().optional(),
  statusLog: z.array(statusLogDTO).optional(),
  fee: z.number(),
  deliveryDate: z
    .string()
    .refine(val => !isNaN(Date.parse(val)), {
      message: "Invalid date string",
    })
    .transform(val => new Date(val)),
  isBlocked: z.boolean().optional(),
});

export type CreateParcelDTO = z.infer<typeof createParcelDTO>;

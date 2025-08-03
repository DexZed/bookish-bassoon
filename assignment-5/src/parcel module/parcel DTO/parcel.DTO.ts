import { z } from "zod";

export const statusLogDTO = z.object({
  status: z.enum(["Requested", "Approved", "Dispatched", "In Transit", "Delivered", "Cancelled", "Returned"]),
  location: z.string().optional(),
  note: z.string().optional(),
});

export type StatusLogDTO = z.infer<typeof statusLogDTO>;

export const createParcelDTO = z.object({
  trackingID: z.string(),
  sender: z.string(),
  receiver: z.string(),
  type: z.enum(["Document", "Box", "Fragile", "Other"]),
  weight: z.number(),
  pickupAddress: z.string(),
  deliveryAddress: z.string(),
  status: z.string(),
  statusLog: z.array(statusLogDTO),
  fee: z.number(),
  deliveryDate: z.date(),
  isBlocked: z.boolean(),
});

export type CreateParcelDTO = z.infer<typeof createParcelDTO>;

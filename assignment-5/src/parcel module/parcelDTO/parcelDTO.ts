
import { z } from "zod";

const createParcelSchema = z.object({
  trackingId: z.string(),
  sender: z.string(),
  receiver: z.string(),
  type: z.enum(["Document", "Box", "Fragile", "Other"]),
  weight: z.number(),
  pickupAddress: z.string(),
  deliveryAddress: z.string(),
  status: z.string(),
  statusLogs: z.array(
    z.object({
      type: z.enum([
        "Requested",
        "Approved",
        "Dispatched",
        "In Transit",
        "Delivered",
        "Cancelled",
        "Returned",
      ]),
      location: z.string(),
      note: z.string(),
    })
  ),
  fee: z.number(),
  deliveryDate: z.date(),
  isBlocked: z.boolean(),
});

export type CreateParcelDTO = z.infer<typeof createParcelSchema>;
import { IParcel } from "../parcel module/parcelSchema/parcel.schema";

export function trackIdGenerator() {
  // id structure TRK-YYYYMMDD-xxxxxx
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let random = Math.floor(Math.random() * 1000000);
  let id = `TRK-${year.toString().padStart(4, "0")}${month
    .toString()
    .padStart(2, "0")}${day.toString().padStart(2, "0")}-${random
    .toString()
    .padStart(6, "0")}`;
  return id;
}

import { z } from "zod";

export const parcelSearchSchema = z.object({
  trackingId: z.string().optional(),
  status: z.union([z.string(), z.array(z.string())]).optional(),
  startDate: z.string().optional().refine(
    (date) => !date || !isNaN(Date.parse(date)),
    { message: "startDate must be a valid ISO date string" }
  ),
  endDate: z.string().optional().refine(
    (date) => !date || !isNaN(Date.parse(date)),
    { message: "endDate must be a valid ISO date string" }
  ),
  senderId: z.string().optional(),
  receiverId: z.string().optional(),
});

export type ParcelSearchDTO = z.infer<typeof parcelSearchSchema>;
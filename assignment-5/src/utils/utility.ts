import { z } from "zod";

export function trackIdGenerator() {
  // id structure TRK-YYYYMMDD-xxxxxx
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const random = Math.floor(Math.random() * 1000000);
  const id = `TRK-${year.toString().padStart(4, "0")}${month
    .toString()
    .padStart(2, "0")}${day.toString().padStart(2, "0")}-${random
    .toString()
    .padStart(6, "0")}`;
  return id;
}

export const parcelSearchSchema = z.object({
  trackingId: z.string().optional(),
  status: z.union([z.string(), z.array(z.string())]).optional(),
  startDate: z.string().optional().refine(
    date => !date || !Number.isNaN(Date.parse(date)),
    { message: "startDate must be a valid ISO date string" },
  ),
  endDate: z.string().optional().refine(
    date => !date || !Number.isNaN(Date.parse(date)),
    { message: "endDate must be a valid ISO date string" },
  ),
  senderId: z.string().optional(),
  receiverId: z.string().optional(),
});

export type ParcelSearchDTO = z.infer<typeof parcelSearchSchema>;


export const whitelist = ["http://localhost:5173"];

export const ACCESS_TOKEN_EXPIRES_IN = "2m";
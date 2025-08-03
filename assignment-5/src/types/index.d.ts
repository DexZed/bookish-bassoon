import type { Request } from "express";
import type { JwtPayload } from "jsonwebtoken";

export type RequestExtend = {
  user?: JwtPayload;

} & Request;

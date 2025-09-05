import type { NextFunction, Response } from "express";

import jwt from "jsonwebtoken";

import type { RequestExtend } from "../types";

import validatedConfig from "../config/validate";
import asyncHandler from "../utils/asynchandler";

const jwtVerify = asyncHandler(
  async (req: RequestExtend, res: Response, next: NextFunction) => {
    const authHeaderRaw = req.headers.authorization || req.headers.Authorization;
    const authHeader = Array.isArray(authHeaderRaw) ? authHeaderRaw[0] : authHeaderRaw;
    console.log(authHeader);
    if (!authHeader?.startsWith("Bearer ")) {
      console.log("Unauthorized at jwtVerify");
      return res.status(401).json({ message: "Unauthorized" });
    }
     
    const token = authHeader.split(" ")[1];
    jwt.verify(token, validatedConfig.ACCESS_TOKEN, (err: any, decoded: any) => {
      if (err) {
        console.error(err);
        console.info("decoded", decoded)
        console.log("Forbidden at jwtVerify");
        return res.status(403).json({ message: "Forbidden" });
      }
      req.user = decoded;
      next();
    });
  },
);
export default jwtVerify;

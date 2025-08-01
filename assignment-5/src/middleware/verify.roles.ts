import { NextFunction, Response } from "express";
import { RequestExtend } from "../types";

export default function verifyRoles(...roles: string[]) {
  return (req: RequestExtend, res: Response, next: NextFunction) => {
    if (!req.user) {
     res.status(401).json({ message: "Unauthorized" })
     return
    };

    const userRoles = req.user.role;
    console.log("Logged in User Role:", userRoles);
    const result = roles.find((role) => userRoles.includes(role));
    console.log("Logged in User Role Result:", result);
    if (!result) {
     res.status(403).json({ message: "Forbidden" })
     return
    };
    next(); //
  };

}

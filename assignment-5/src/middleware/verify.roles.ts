import { NextFunction, Response } from "express";
import { RequestExtend } from "../types";

export default function verifyRoles(...roles: string[]) {
  return (req: RequestExtend, res: Response, nest: NextFunction) => {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    const userRoles = req.user.role;
    console.log("Logged in User Role:", userRoles);
    const result = roles.find((role) => userRoles.includes(role));
    console.log("Logged in User Role Result:", result);
    if (!result) return res.status(403).json({ message: "Forbidden" });
    nest(); //
  };

}

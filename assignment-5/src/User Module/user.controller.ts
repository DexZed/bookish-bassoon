import asyncHandler from "../utils/asynchandler";
import UserService from "./user.service";
import { Request, Response } from "express";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  findAll = asyncHandler(async (_: Request, res: Response) => {
    const users = await this.userService.findAll();
    res.status(200).json({ message: "Users fetched successfully", users });
  });

  blockUser = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await this.userService.blockById(id);
    res.status(200).json({ message: "User blocked successfully", user });
  });

  unblockUser = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await this.userService.unblockById(id);
    res.status(200).json({ message: "User unblocked successfully", user });
  });
}

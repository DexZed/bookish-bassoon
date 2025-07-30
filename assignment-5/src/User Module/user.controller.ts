import asyncHandler from "../utils/asynchandler";
import UserService from "./user.service";
import { Request, Response } from "express";
import { IUSer } from "./userEntity/entity";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }
  createUser = asyncHandler(async (req: Request, res: Response) => {
    const data: IUSer = req.body;
    const findUser = await this.userService.findByEmail(data.email);
    if (findUser) {
      res.status(400).json({ message: "Email already exists" });
    }
    const user = await this.userService.createUser(data);
    res.status(201).json({ message: "User created successfully", user });
  });

  findAll = asyncHandler(async (req: Request, res: Response) => {
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

import { Request, Response } from "express";
import asyncHandler from "../utils/asynchandler";
import AuthService from "./auth.service";

export default class AuthController {
  private readonly authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  registerUser = asyncHandler(async (req: Request, res: Response) => {
    const data = req.body;
    const user = await this.authService.register(data);
    res.status(201).json({ message: "User registered successfully", user });
  });

  loginUser = asyncHandler(async (req: Request, res: Response) => {
    const data = req.body;
    const user = await this.authService.login(data.email, data.password);
    res.status(200).json({ message: "User logged in successfully", user });
  });
  getUser = asyncHandler(async (req: Request, res: Response) => {
    const email = req.params.email;
    const user = await this.authService.findByEmail(email);
    res.status(200).json({ message: "User fetched successfully", user });
  });
}

import type { Request, Response } from "express";

import jwt from "jsonwebtoken";

import validatedConfig from "../../config/validate";
import asyncHandler from "../../utils/asynchandler";
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
    const accessToken = jwt.sign(
      {
        userName: user?.name,
        email: user?.email,
        role: user?.role,
      },
      validatedConfig.ACCESS_TOKEN,
      {
        expiresIn: "1h", // change this to 1hr after testing
      },
    );
    res.cookie("jwt", user?.refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    const filteredUserField = {
      name: user?.name,
      email: user?.email,
      role: user?.role,
      isBlocked: user?.isBlocked,
      accessToken,
    };
    res
      .status(200)
      .json({ message: "User logged in successfully", filteredUserField });
  });

  getUser = asyncHandler(async (req: Request, res: Response) => {
    const email = req.params.email;
    const user = await this.authService.findByEmail(email);
    res.status(200).json({ message: "User fetched successfully", user });
  });

  logout = asyncHandler(async (req: Request, res: Response) => {
    await this.authService.logout(req, res);
    res.status(204).json({ message: "User logged out successfully" });
  });
}

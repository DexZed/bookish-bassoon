import type { Request, Response } from "express";

import asyncHandler from "../utils/asynchandler";
import RefreshTokenService from "./reftok.service";

export default class RefreshTokenController {
  private readonly refreshTokenService: RefreshTokenService;
  constructor() {
    this.refreshTokenService = new RefreshTokenService();
  }

  getRefreshToken = asyncHandler(async (req: Request, res: Response) => {
    const accessToken = await this.refreshTokenService.refreshToken(req);

    if (!accessToken) {
      return res.sendStatus(403);
    }
    return res.status(200).json({
      message: "Access token generated successfully",
      response: accessToken,
    });
  });
}

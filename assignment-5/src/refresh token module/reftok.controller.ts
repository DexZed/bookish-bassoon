import { Response, Request } from "express";
import asyncHandler from "../utils/asynchandler";
import RefreshTokenService from "./reftok.service";

export default class RefreshTokenController {
  private readonly refreshTokenService: RefreshTokenService;
  constructor() {
    this.refreshTokenService = new RefreshTokenService();
  }
  getRefreshToken = asyncHandler(async (req: Request, res: Response) => {
    const refreshToken = await this.refreshTokenService.refreshToken(req, res);
    return res.status(200).json({
      message: "Access token generated successfully",
      response: refreshToken,
    });
  });
}

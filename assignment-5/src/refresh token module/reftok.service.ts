import type { Request, Response } from "express";
import type { JwtPayload } from "jsonwebtoken";

import jwt from "jsonwebtoken";

import validatedConfig from "../config/validate";
import UserRepository from "../modules/User Module/repository/user.repository";


export default class RefreshTokenService {
  private readonly userRepository: UserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }

  async refreshToken(req: Request, _?: Response) {
    const cookies = req.cookies;
    // console.log("Cookies:", cookies);
    if (!cookies?.jwt)
    { // console.log("No cookies found at refreshToken");
      return null;}
    const refreshToken = cookies.jwt;
    // console.log("refreshToken:", refreshToken);
    const user = await this.userRepository.findByRefreshToken(refreshToken);
    // console.log("user:", user);
    // console.log("check if Refresh token at jwt and refresh token at user object", refreshToken ===user?.refreshToken)
    if (!user) {
      // console.log("User not found at refreshToken");
      return null;
    }

    let decoded: JwtPayload;

    try {
      decoded = jwt.verify(refreshToken, validatedConfig.REFRESH_TOKEN) as JwtPayload;
       // console.log(decoded);
    }
    catch (error: any) {
       console.error("Error verifying refresh token:", error);
      return null;
    }

    if (user?.email !== decoded.email) {
      // console.log("Email mismatch at refreshToken");
      return null;
    };

    const accessToken = jwt.sign(
      {
        name: decoded.name,
        email: decoded.email,
        role: decoded.role,
      },
      validatedConfig.ACCESS_TOKEN,
      { expiresIn: "1d" },
    );
    
    //console.log("user object", userObject);
    return { accessToken };
  }
}

import { Request, Response } from "express";
import UserRepository from "../User Module/repository/user.repository";
import jwt,{JwtPayload} from "jsonwebtoken";
import validatedConfig from "../config/validate";

export default class RefreshTokenService {
  private readonly userRepository: UserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }
  async refreshToken(req: Request, res: Response) {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;
    const user = await this.userRepository.findByRefreshToken(refreshToken);
    if (!user) {
      res.sendStatus(403);
    }
    const decoded:JwtPayload = jwt.verify(refreshToken, validatedConfig.REFRESH_TOKEN) as JwtPayload;
    if (user?.name !== decoded.name) return null;

    const accessToken = jwt.sign(
      {
        name: decoded.name,
        email: decoded.email,
        role: decoded.role,
      },
      validatedConfig.ACCESS_TOKEN,
      { expiresIn: "1h" }
    );
    return {
        name:user?.name,
        email:user?.email,
        role:user?.role,
        accessToken
    }
  }
}

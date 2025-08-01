import { Request, Response } from "express";
import validatedConfig from "../config/validate";
import { IUSer } from "../User Module/userEntity/entity";
import AuthRepository from "./auth repository/auth.repository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export default class AuthService {
  private readonly authRepository: AuthRepository;
  constructor() {
    this.authRepository = new AuthRepository();
  }
  /**
   * add request token here
   */
  async register(data: IUSer): Promise<IUSer> {
    const findUser = await this.authRepository.findByEmail(data.email);
    if (findUser) {
      throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword as unknown as string;
    const user = await this.authRepository.register(data);
    return user;
  }
  /**
   * issue cookie here
   */
  async login(email: string, password: string): Promise<IUSer | null> {
    const user = await this.authRepository.login(email);
    if (!user) {
      throw new Error("Invalid email or password");
    }
    if (user.isBlocked) {
      throw new Error("User is blocked");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    const refreshToken = jwt.sign(
      {
        name: user.name,
        email: user.email,
        role: user.role,
      },
      validatedConfig.REFRESH_TOKEN,
      {
        expiresIn: "1d",
      }
    );
    // saving refresh token in db
    user.refreshToken = refreshToken;
    await user.save();
    return user;
  }
  async findByEmail(email: string): Promise<IUSer | null> {
    return await this.authRepository.findByEmail(email);
  }
  async logout(req: Request, res: Response): Promise<IUSer | null> {
    const cookies = req.cookies;
    if (!cookies?.jwt) return null;
    const refreshToken = cookies.jwt;
    const user = await this.authRepository.findByRefreshToken(refreshToken);
    if (!user) {
      res.clearCookie("jwt", {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        secure: process.env.NODE_ENV === "production" ? true : false,
      });
      return null;
    }
    user.refreshToken = "";
    await user.save();
    res.clearCookie("jwt", {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      secure: process.env.NODE_ENV === "production" ? true : false,
    });
    return user;
  }
}

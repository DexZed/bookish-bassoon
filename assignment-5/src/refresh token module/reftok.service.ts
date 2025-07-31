import { Request, Response } from "express";
import UserRepository from "../User Module/repository/user.repository";
import jwt,{JwtPayload} from "jsonwebtoken";
import validatedConfig from "../config/validate";


export default class RefreshTokenService {
  private readonly userRepository: UserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }
  async refreshToken(req: Request, _?: Response) {
    const cookies = req.cookies;
    
    if (!cookies?.jwt) return  null;
    const refreshToken = cookies.jwt;
   
    const user = await this.userRepository.findByRefreshToken(refreshToken);
   
    if (!user) {
       return null;
    }

    let decoded:JwtPayload;

    try {
       decoded = jwt.verify(refreshToken, validatedConfig.REFRESH_TOKEN) as JwtPayload;
       console.log(decoded)
    } catch (error: any) {
      console.error("Error verifying refresh token:", error)
      return null;
    }
     
    if (user?.email !== decoded.email) {
     
      return null;
    };
   
    const accessToken =  jwt.sign(
      {
        name: decoded.name,
        email: decoded.email,
        role: decoded.role,
      },
      validatedConfig.ACCESS_TOKEN,
      { expiresIn: "1h" }
    );
    const userObject = {
        name:user?.name,
        email:user?.email,
        role:user?.role,
        accessToken
    }
    console.log("user object",userObject)
    return userObject;
    
  }
}

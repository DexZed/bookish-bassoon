import { IUSer } from "../User Module/userEntity/entity";
import AuthRepository from "./auth repository/auth.repository";
import bcrypt from "bcrypt";

export default class AuthService {
  private readonly authRepository: AuthRepository;
  constructor() {
    this.authRepository = new AuthRepository();
  }
  async register(data: IUSer): Promise<IUSer> {
    const findUser= await this.authRepository.findByEmail(data.email);
    if (findUser) {
      throw new Error("Email already exists");
    }
    
    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword as unknown as string;
    const user = await this.authRepository.register(data);
    return user;
  }
  async login(email: string, password: string): Promise<IUSer | null> {
    const user = await this.authRepository.login(email);
    if (!user) {
      throw new Error("Invalid email or password");
    }
    if (user.isBlocked) {
      throw new Error("User is blocked");
    }
    const isPasswordValid = await bcrypt.compare(user.password, password);
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }
    return user;
  }
  async findByEmail(email: string): Promise<IUSer | null> {
    return await this.authRepository.findByEmail(email);
  }
}

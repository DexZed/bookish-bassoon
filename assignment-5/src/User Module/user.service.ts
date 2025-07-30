import UserRepository from "./repository/user.repository";
import { IUSer } from "./userEntity/entity";

export default class UserService {
  private readonly userRepository: UserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }
  async findAll(): Promise<IUSer[]> {
    return await this.userRepository.findAll();
  }
  // only admins can block user , needs cookie auth from request
  async blockById(id: string): Promise<IUSer> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    user.isBlocked = true;
    await user.save();
    return user;
  }
  // only admins can unblock user , needs cookie auth from request
  async unblockById(id: string): Promise<IUSer> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    user.isBlocked = false;
    await user.save();
    return user;
  }
   
//   async findByEmail(email: string): Promise<IUSer | null> {
//     return await this.userRepository.findByEmail(email);
//   }
//   async createUser(data: IUSer): Promise<IUSer> {
//     return await this.userRepository.create(data);
//   }
  
}

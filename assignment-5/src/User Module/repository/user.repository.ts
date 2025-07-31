import { GenericRepository } from "../../Base Repository/generic.repository";
import User, { IUSer } from "../userEntity/entity";

export default class UserRepository extends GenericRepository<IUSer> {
  constructor() {
    super(User);
  }

  async findByEmail(email: string): Promise<IUSer | null> {
    const user = await User.findOne({ email });
    return user ? user : null;
  }
  async findByRefreshToken (refreshToken: string) : Promise<IUSer |null>{
    const user = await User.findOne({ refreshToken });
    return user ? user : null;
  }
}

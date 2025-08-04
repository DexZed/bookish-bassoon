import type { IUSer } from "../userEntity/entity";

import { GenericRepository } from "../../../Base Repository/generic.repository";
import User from "../userEntity/entity";

export default class UserRepository extends GenericRepository<IUSer> {
  constructor() {
    super(User);
  }

  async findByEmail(email: string): Promise<IUSer | null> {
    const user = await User.findOne({ email });
    return user || null;
  }

  async findByRefreshToken(refreshToken: string): Promise<IUSer | null> {
    const user = await User.findOne({ refreshToken });
    return user || null;
  }
}

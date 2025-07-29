import { GenericRepository } from "../../Base Repository/generic.repository";

import { IUSer, User } from "../userEntity/userEntity";

export default class UserRepository extends GenericRepository<IUSer> {
  constructor() {
    super(User);
  }
}

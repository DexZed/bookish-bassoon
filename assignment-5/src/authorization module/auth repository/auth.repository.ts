import { GenericRepository } from "../../Base Repository/generic.repository";
import User, { IUSer } from "../../User Module/userEntity/entity";
import { CreateUser } from "../userDTOs/user.DTO";


export default class AuthRepository extends GenericRepository<IUSer>{
    constructor(){
        super(User);
    }
    async register(data:CreateUser):Promise<IUSer>{
        const user = new User(data);
        return await this.create(user);
    
    }
    async login(email:string):Promise<IUSer | null>{
        const user = await User.findOne({email});
        return user ? user : null;
    }
    async findByEmail(email:string):Promise<IUSer | null>{
        const user = await User.findOne({email});
        return user ? user : null;
    }
    async findByRefreshToken (refreshToken: string) : Promise<IUSer |null>{
    const user = await User.findOne({ refreshToken });
    return user ? user : null;
  }

}
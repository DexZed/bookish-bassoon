import { GenericRepository } from "../../Base Repository/generic.repository";
import User, { IUSer } from "../../User Module/userEntity/entity";


export default class AuthRepository extends GenericRepository<IUSer>{
    constructor(){
        super(User);
    }
    async register(data:IUSer):Promise<IUSer>{
        return await this.create(data);
    
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
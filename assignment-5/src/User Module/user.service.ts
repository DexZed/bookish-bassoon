import UserRepository from "./repository/repository";
import { IUSer } from "./userEntity/entity";



export default class UserService{
    private readonly userRepository : UserRepository;
    constructor(){
        this.userRepository = new UserRepository();
    }
    async findAll() :Promise<IUSer[]>{
        return await this.userRepository.findAll();
    
    }
    async blockById(id:string):Promise<IUSer>{
        const user = await this.userRepository.findById(id);
        if(!user){
            throw new Error('User not found');
        }
        user.isBlocked = true;
        await user.save();
        return user;
    
    }
    async unblockById(id:string):Promise<IUSer>{
        const user = await this.userRepository.findById(id);
        if(!user){
            throw new Error('User not found');
        }
        user.isBlocked = false;
        await user.save();
        return user;
    
    }
    
}
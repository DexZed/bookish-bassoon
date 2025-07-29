import UserRepository from "./user Repository/user.repository";
import { CreateUserDTO } from "./userDTO/userDTO";
import { IUSer } from "./userEntity/userEntity";


export default class UserService {
    private readonly userRepository:UserRepository;
    constructor(){
        this.userRepository = new UserRepository();
    }
    async create(userDTO:CreateUserDTO):Promise<IUSer>{
        const user = await this.userRepository.create(userDTO);
        return user;
    }

}
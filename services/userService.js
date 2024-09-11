import { UserRepository } from "../repository/userRepository";
export class UserService{
    constructor(){
        this.UserRepository = new UserRepository();
    }
    addUser(body,usersData){
        return this.UserRepository.addUser(body,usersData);
    }
    deleteUser(usersData,pathSegments){
        let val=usersData.find(temp=>temp.id==pathSegments[2]);
        if(val){
            this.UserRepository.deleteUser(val);
        }
    }
    updateUserById(usersData,pathSegments,body){
        let val=usersData.find(temp=>temp.id==pathSegments[2]);
        if(val){
           return  this.UserRepository.updateUserById(val,body);
        };
    }
}
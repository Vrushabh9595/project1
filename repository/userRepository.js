import { usersData } from "../mockData/userMockData";

export class UserRepository{
    addUser(body,usersData){
        usersData.push(body);
    }
    deleteUser(val){
        usersData.splice(usersData.indexOf(val), 1);
    }
    updateUserById(val,body){
        for(let abc in body){
            val[abc] = body[abc];
        }
        return val;
    }
}
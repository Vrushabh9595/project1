import { usersData } from "../mockData/userMockData";
import jwt from 'jsonwebtoken';
import {verifyToken} from "../utility/authUtility";
import 'dotenv/config'
import { decodeURL } from "../utility/utilityFunc";
import { UserService } from "../services/userService";
export class UserController{
    controller(req,res){
    const {pathSegments,pathLength}=decodeURL(req.url);
    const method=req.method;
    let data='';
    req.on('data',(chunk)=>{
        data+=chunk;
    })

    if(method==="POST" && pathLength===3 && pathSegments[2]==="login"){
        req.on("end",()=>{
            const user=JSON.parse(data);
            const isUserPresent=usersData.find((para)=>{
                if(para.emailAddress===user.emailAddress && para.password===user.password){
                    return true;
                }
                else{
                    return false;
                }
            })
            if(isUserPresent){
                const token=jwt.sign({email:isUserPresent.emailAddress},process.env.SECRET_KEY,{expiresIn:'1h'});
                res.writeHead(200,{'Content-Type': 'application/json'});
                res.end(JSON.stringify({message:"Logged in Successfully",data:token}))
            }
            else{
                res.writeHead(401,{'Content-Type': 'application/json'});
                res.end(JSON.stringify({message:"User not found"}))
            }
        })
    }

    else if(method==="POST" && pathSegments[2]==="createProfile" && pathLength===3){
        req.on("end",()=>{
            let abc=verifyToken(req, res);
            if(abc){
                let body=JSON.parse(data);
                let returnVal=this.UserService.addUser(body,usersData);
                res.writeHead(200,{'Content-Type': 'application/json'});
                res.end(JSON.stringify({message:"profile created Successfully",data:returnVal}))
            }
        })
    }
    else if (method==="DELETE" && pathLength===3){
        let abc=verifyToken(req, res);
        if(abc){
            this.UserService.deleteUser(usersData,pathSegments);
            res.writeHead(200,{'Content-Type': 'application/json'});
            res.end(JSON.stringify({message:"profile deleted Successfully"}))
        }
    }
    else if(method === "PUT" && pathLength===3){
        let abc=verifyToken(req, res);
        if(abc){
            req.on("end",()=>{
                let body = JSON.parse(data);
                let returnVal=this.UserService.updateUserById(usersData,pathSegments,body);
                res.writeHead(200,{'Content-Type': 'application/json'});
                res.end(JSON.stringify({message:"profile updated Successfully",data:returnVal}))
            })
        }
    }



    }    
}
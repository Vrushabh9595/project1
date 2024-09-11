import http from "http";
import { UserController } from "./controller/userController";
import { TasksController } from "./controller/tasksController";
import { decodeURL } from "./utility/utilityFunc";

const server=http.createServer((req,res)=>{
    const {pathSegments}=decodeURL(req.url);

    if(pathSegments[1]==="users"){
        return new UserController().controller(req,res);
    }
    else if(pathSegments[1]==="tasks"){
        return new TasksController().controller(req,res);
    }
    else{
        res.writeHead(404,{'Content-Type': 'application/json'});
        res.end(JSON.stringify({message:"api not found"}))               
    }
});


server.listen(process.env.PORT,()=>{
    console.log(`Server is running at http://localhost:${process.env.PORT}`);
});

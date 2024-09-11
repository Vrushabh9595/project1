import {verifyToken} from "../utility/authUtility";
import { tasks } from "../mockData/taskMockData";
import { decodeURL } from "../utility/utilityFunc";
import { TaskService } from "../services/taskService";

export class TasksController{
    constructor(){
        this.TaskService=new TaskService();
        }
        controller(req,res){  
            const {queryPara,pathSegments,pathLength}=decodeURL(req.url);
            let method=req.method;
            let num=+pathSegments[2]; 
            let data="";
            req.on('data',(chunk)=>{
                data+=chunk;
            });
            let arr=[];
            let body;

//1>task creating
     if(method==="POST" && pathLength===2){
        let abc=verifyToken(req, res);
        if(abc){ 
            req.on("end",()=>{
            body=JSON.parse(data);
            const returnVal=this.TaskService.addNewTask(tasks,body);
            res.writeHead(201,{'Content-Type': 'application/json'});
            res.end(JSON.stringify({message:"new task is created",data:returnVal}))
            })
        }        
    } 

//2>get all task
    else if(method==="GET" && pathLength===2){
        let abc=verifyToken(req, res);
        if(abc){
            const returnVal=this.TaskService.getAllTask(tasks);
            console.log(returnVal);
            res.writeHead(201,{'Content-Type': 'application/json'});
            res.end(JSON.stringify({message:"retrived all tasks",data:returnVal}))
        }
    }   

//3>get task by specific id
   else if(method==="GET" && pathLength===3 && num>0){
    let abc=verifyToken(req, res);
        if(abc){
            const returnVal=this.TaskService.getTaskById(tasks,pathSegments[2]);
            res.writeHead(201,{'Content-Type': 'application/json'});
            res.end(JSON.stringify({message:"specific task displayed",data:returnVal}))
        }
    }
    
//4>update the by id
    else if(method==="PUT" && pathLength===3){
        let abc=verifyToken(req, res);
        if(abc){
        req.on("end",()=>{
            let body=JSON.parse(data);
            const returnVal=this.TaskService.updateTaskById(body,tasks,pathSegments);
            console.log("returnVal=",returnVal);
            res.writeHead(200,{'Content-Type':'application/json'});
            res.end(JSON.stringify({message:"task updated",data:returnVal}));
            })     
        }
    }

//5>delete a task by id
    else if(method==="DELETE" && pathLength===3 && num>0){
        let abc=verifyToken(req, res);
        if(abc){
            this.TaskService.deleteTaskById(tasks,pathSegments);
            res.writeHead(200,{'Content-Type':'application/json'});
            res.end(JSON.stringify({message:"task deleted",data:tasks}));
        }
    }

//6>Task prioritization
    else if(method==="PATCH" && pathLength===4 && pathSegments[3]==="priority"){
       let abc=verifyToken(req, res);
        if(abc){
            req.on("end",()=>{
                let body=JSON.parse(data);
                let returnVal=this.TaskService.taskPriority(tasks,pathSegments,body);
                res.writeHead(200,{'Content-Type':'application/json'});
                res.end(JSON.stringify({message:"task prioritization",data:returnVal}));
            }) 
         } 
    }

//7>Assign task to user by id
    else if(method==="PATCH" && pathLength===4 && pathSegments[3]==="assign"){
        let abc=verifyToken(req, res);
        if(abc){
            req.on("end",()=>{
                body=JSON.parse(data);
                let returnVal=this.TaskService.assignTaskById(tasks,body,pathSegments);
                res.writeHead(200,{'Content-Type':'application/json'});
                res.end(JSON.stringify({message:"task assigned to user",data:returnVal}));
            })
        }
    }

//8>Unassign task by id
   else if(method==="PATCH" && pathLength===4 && pathSegments[3]==="unassign"){
        let abc=verifyToken(req, res);
        if(abc){
            let returnVal=this.TaskService.unassignTask(tasks,pathSegments);
            res.writeHead(200,{'Content-Type':'application/json'});
            res.end(JSON.stringify({message:"task unassigned",data:returnVal}));   
        }
    }

//9>categorize tasks specific task by id
    else if(method==="PATCH" && pathLength===4 && pathSegments[3]==="categorize"){
        let abc=verifyToken(req, res);
        if(abc){
            req.on("end",()=>{
                body=JSON.parse(data);
                let returnVal=this.TaskService.categorizeTask(tasks,pathSegments); 
                res.writeHead(200,{'Content-Type':'application/json'});
                res.end(JSON.stringify({message:"task with the categorize",data:returnVal}));
            })
        }
    }

//10>history of specific task by its id
    else if(method==="GET" && pathLength===4 && pathSegments[3]==="history"){
        const  abc=verifyToken(req, res);
        if(abc){
            let returnVal=this.TaskService.taskHistoryTracking(tasks,pathSegments); 
            res.writeHead(200,{'Content-Type':'application/json'});
            res.end(JSON.stringify({message:"history of task",data:returnVal})); 
        }    
    }


//11>create task comment by its id
    else if(method==="POST" && pathLength===4 && pathSegments[3]==="comments"){
        let abc=verifyToken(req, res);
        if(abc){
            req.on("end",()=>{
                body=JSON.parse(data);
                let returnVal=this.TaskService.taskCommenting(tasks,pathSegments,body); 
                res.writeHead(201,{'Content-Type':'application/json'});
                res.end(JSON.stringify({message:"commnet created",data:returnVal}))
            })
        }
    }

//12>search tasks by queryParameter
    else if(method==="GET" && pathLength===3 && pathSegments[2]==="search"){
        let abc=verifyToken(req, res);
        if(abc){
            let array=[];
            let returnVal=this.TaskService.searchTask(tasks,queryPara,array); 
            res.writeHead(200,{'Content-Type':'application/json'});
            res.end(JSON.stringify({message:"task searched",data:returnVal}));
        }
    }
//13>complete specific task by id
    else if(method==="PATCH" && pathLength===4 && pathSegments[3]==="complete"){
        let abc=verifyToken(req, res);
        if(abc){
            let returnVal=this.TaskService.taskCompletionById(tasks,pathSegments); 
            res.writeHead(200,{'Content-Type':'application/json'});
            res.end(JSON.stringify({message:"specific task completed",data:returnVal}))
        }          
}

//14>complete all pending tasks
    else if(method==="PATCH" && pathLength===3 && pathSegments[2]==="complete-all"){
        let abc=verifyToken(req, res);
    if(abc){
        let abcd=[];
        let returnVal=this.TaskService.completeAllPendingTask(tasks,abcd); 
        res.writeHead(200,{'Content-Type':'application/json'});
        res.end(JSON.stringify({message:"all tasks are completed",data:returnVal}))
    }
}
    
//15>Delete all completed tasks
    else if(method==="DELETE" && pathLength===3 && pathSegments[2]==="delete-completed"){
        let abc=verifyToken(req, res);
        if(abc){
            this.TaskService.deleteAllCompletedTask(tasks); 
            res.writeHead(200,{'Content-Type':'application/json'});
            res.end(JSON.stringify({message:"all completed tasks is deleted"}));
        }
    }

//16>due date remainder
    else if(method==="GET" && pathLength===3 && pathSegments[2]==="due-soon"){
        let abc=verifyToken(req, res);
        if(abc){
            let arr=[];
            let returnVal=this.TaskService.dueDateRemainder(tasks,arr); 
            res.writeHead(200,{'Content-Type':'application/json'});
            res.end(JSON.stringify({message:" Retrieve tasks that are due within a specified time frame ",data:returnVal}));
        }
    }

//17>overdue tasks
    else if(method==="GET" && pathLength===3 && pathSegments[2]==="overdue"){
        let abc=verifyToken(req, res);
        if(abc){
            let arr=[];
            let returnVal=this.TaskService.overdue(tasks,arr); 
            res.writeHead(200,{'Content-Type':'application/json'});
            res.end(JSON.stringify({message:"  Return a list of overdue tasks. ",data:returnVal}))
        }
    }

//18>Task duplication
    else if(method==="POST" && pathLength===4 && pathSegments[3]==="duplicate"){
        let abc=verifyToken(req, res);
        if(abc){
            let abcd;
            let returnVal=this.TaskService.taskDuplication(tasks,abcd,pathSegments);
            res.writeHead(200,{'Content-Type':'application/json'});
            res.end(JSON.stringify({message:"  Duplicate an existing task. ",data:returnVal}));
        }
    }

//19>Archive completed tasks
    else if(method==="PATCH" && pathLength===4 && pathSegments[3]==="archive"){
        let abc=verifyToken(req, res);
        if(abc){
            let returnVal=this.TaskService.archiveCompletedTask(tasks);
            res.writeHead(200,{'Content-Type':'application/json'});
            res.end(JSON.stringify({message:"Archive tasks that have been completed.",data:returnVal}));
        }
    }

//21>Bulk task creation
    else if(method==="POST" && pathLength===3 && pathSegments[2]==="bulk"){
        let abc=verifyToken(req, res);
        if(abc){  
            req.on("end",()=>{
                body=JSON.parse(data);
                let returnVal=this.TaskService.bulkTAskCreation(body,tasks);
                res.writeHead(200,{'Content-Type':'application/json'});
                res.end(JSON.stringify({message:" the list of created tasks by bulk.",data:returnVal}))
            }) 
        }
    }
}
}

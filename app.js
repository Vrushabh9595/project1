



import http from "http";
import { type } from "os";
import url from "url";
import jwt from "jsonwebtoken";
import { emit } from "process";
const PORT=3000;
let arr2=[];

let id=1;
let tasks=[

]  

let userData=[
    {
        emailId:"jhon555@gmail.com",
        password:"123456789"
    },
    {
         emailId:"don@gmail.com",
        password:"987654321"
    },
    {
         emailId:"peter87@gmail.com",
        password:"54321"
    }
]

let server=http.createServer((req,res)=>{
    let path=url.parse(req.url,true);
    let PathName=path.pathname;
    let split=PathName.split("/");
    console.log(path);
    let method=req.method;
    console.log("pathname",PathName)
    console.log("SPLIT",split)
    // let path=req.url;
    let query=path.query;
    console.log("QUERYyy",query) ;
    let secretKey="vbajgdfvbad";    

    //user/login
    if(method==="POST" && split[1]==="user" && split[2]==="login" && split.length===3){
        let body="";
        req.on("data",(chunk)=>{
            body=body+chunk;
        })

        req.on("end",()=>{
            body=JSON.parse(body);
           let store=userData.find((temp)=>{
                if(temp.emailId===body.emailId && temp.password==body.password){
                    return true;
                }
                else{
                    return false;
                }
            })
            if(store){
                const token=jwt.sign({email:store.email},secretKey,{expiresIn:'1h'})
                res.writeHead(200,{'Content-Type': 'application/json'});
                res.end(JSON.stringify({message:"login successful",token:token}))
            }
            else{
                res.writeHead(401,{'Content-Type': 'application/json'});
                res.end(JSON.stringify({message:"invalid credentials"}))
            }
        })
    }


    // post /tasks
    if(method==="POST" && split[1]==="tasks" && split.length===2){
        let abc=verifyToken(req, res);
        if(abc){
            let body="";
            req.on("data",(chunk)=>{
                body=body+chunk;
                body=JSON.parse(body)
                body.id=id++;
                tasks.push(body);
                console.log("inner TAsks",tasks)
            })
            req.on("end",()=>{
                res.writeHead(201,{'Content-Type': 'application/json'});
                res.end(JSON.stringify({message:"post api called",data:body}))
    
        })
        }

        }

    //get /tasks

    if(method==="GET" && split[1]==="tasks" && split.length===2){
        let abc=verifyToken(req, res);
        if(abc){
            res.writeHead(200,{'Content-Type': 'application/json'});
            res.end(JSON.stringify({message:"get api called",data:tasks}))
        }
    }
  
    // get /tasks/2/
    let xyz=+split[2];
    if(method==="GET" && split[1]==="tasks" && split.length===3 && xyz>0){
        let abc=verifyToken(req, res);
        if(abc){
            if(split[2]<=tasks.length){
                res.writeHead(200,{'Content-Type': 'application/json'});
                res.end(JSON.stringify({message:"get api called",data:tasks[split[2]-1]}))
            }
            else{
                res.writeHead(404,{'Content-Type': 'application/json'});
                res.end(JSON.stringify({message:"Task not found."}))
            }
        }
    }

// PUT /tasks/:id
// "get comments"


    if(method==="PUT" && split[1]==="tasks" && split.length===3){
        let abc=verifyToken(req, res);
        if(abc){
            let body="";
            req.on("data",(chunk)=>{
                body=body+chunk;
            })
    
        req.on("end",()=>{
            let Body=JSON.parse(body);
                    for(let xyz in Body){
                        tasks[split[2]-1][xyz]=Body[xyz]; 
                    }
            if(split[2]<=tasks.length){
                // console.log("final s",split[2]);
                res.writeHead(200,{'Content-Type':'application/json'});
                res.end(JSON.stringify({message:"task updated",data:tasks[split[2]-1]}));
            }
            else{
                res.writeHead(404,{'Content-Type':'application/json'});
                res.end(JSON.stringify({message:"task not found .."}));
            }
        })      
        }
}
    
// Delete /tasks/:id
let abc=+split[3]
// console.log(typeof abc)
if(method==="DELETE" && split[1]==="tasks" && split.length===3 && abc>0){
    let abc=verifyToken(req, res);
    if(abc){
        tasks.splice(split[2]-1,1);
        if(split[2]<=tasks.length){
            res.writeHead(200,{'Content-Type':'application/json'});
            res.end(JSON.stringify({message:"task deleted",data:tasks}));
        }
        else{
            res.writeHead(404,{'Content-Type':'application/json'});
            res.end(JSON.stringify({message:"task not founds..."}));
        }        
    }

}

  
//PATCH /tasks/:id/priority

if(method==="PATCH" && split[1]==="tasks" && split.length===4 && split[3]==="priority"){
    let abc=verifyToken(req, res);
    if(abc){
        let body="";
        req.on("data",(chunk)=>{
            body=body+chunk;
        }) 
    
        req.on("end",()=>{
            let resBody=JSON.parse(body);
            console.log("resBody",resBody);
            tasks.forEach((temp)=>{
                if(temp.id==split[2]){
                    temp.priority=resBody.priority;
                    res.writeHead(200,{'Content-Type':'application/json'});
                    res.end(JSON.stringify({message:"priority updated",data:resBody}));
                }
            })
        }) 
        
    }
}



// PATCH /tasks/:id/assign 

// if(method==="patch" && split[1]==="tasks" && split[3]==="assign" && split.length===4){
//     let body="";
//     req.on("data",(chunk)=>{
//         body=body+chunk;
//     })
//     req.on("end",()=>{
//                     body=JSON.parse(body);
//                     tasks.forEach((para)=>{
//                         if(para.id==split[2]){
//                             para.assignedTo= body.assignedTo; 
//                             res.writeHead(200,{'Content-Type':'application/json'});
//                             res.end(JSON.stringify({message:"priority updated",data:body}));
//             }
//         })
//     })
// }


// PATCH /tasks/:id/assign

    if(method==="PATCH" && split.length===4 && split[1]==="tasks" && split[3]==="assign"){
        let abc=verifyToken(req, res);
        if(abc){
            let body="";
            req.on("data",(chunk)=>{
                body=body+chunk
            })
            req.on("end",()=>{
                body=JSON.parse(body);
                tasks.forEach((temp)=>{
                    if(temp.id==split[2]){
                        temp.assignedTo= body.assignedTo; 
                        res.writeHead(200,{'Content-Type':'application/json'});
                        res.end(JSON.stringify({message:"priority updated",data:body}));
                    }
                })
            })
        }
    }



//PATCH /tasks/:id/unassign

if(method==="PATCH" && split[1]==="tasks" && split[3]==="unassign" && split.length===4){
    let abc=verifyToken(req, res);
    if(abc){
        tasks.forEach((temp)=>{
            if(temp.id==split[2]){
                temp.assignedTo= null; 
                res.writeHead(200,{'Content-Type':'application/json'});
                res.end(JSON.stringify({message:"priority updated",data:temp}));
            }
        })
    }
}

//PATCH /tasks/:id/categorize

if(method==="PATCH"  && split[1]==="tasks" && split[3]==="categorize" && split.length===4){
    let abc=verifyToken(req, res);
    if(abc){
        let body="";
        req.on("data",(chunk)=>{
            body=body+chunk;
        })
        req.on("end",()=>{
            body=JSON.parse(body);
            tasks.forEach((temp)=>{
                if(temp.id==split[2]){
                    temp.category=body.category
                    res.writeHead(200,{'Content-Type':'application/json'});
                    res.end(JSON.stringify({message:"task with the categorize",data:body}));
                }
            })
        })
    }
}


 
//GET /tasks/:id/history

// if(method==="GET" && split[1]==="tasks" && split[3]==="history" && split.length===4){

// }











//POST /tasks/:id/comments

if(method==="POST" && split[1]==="tasks" && split[3]==="comments" && split.length===4){
    let abc=verifyToken(req, res);
    if(abc){
        let body="";
        req.on("data",(chunk)=>{
            body=body+chunk;
        })
        req.on("end",()=>{
            body=JSON.parse(body);
            tasks.forEach((temp)=>{
                if(temp.id==split[2]){
                    temp.comment=body;
                    res.writeHead(201,{'Content-Type':'application/json'});
                    res.end(JSON.stringify({message:"commnet created",data:body}))
                }
            })
        })
    }
}

//GET /tasks/:id/comments 
if(method==="GET" && split[1]==="tasks" && split[3]==="comments" && split.length===4){
    let abc=verifyToken(req, res);
    if(abc){
        tasks.forEach((temp)=>{
            if(temp.id==split[2]){
                res.writeHead(200,{'Content-Type':'application/json'});
                res.end(JSON.stringify({message:"get comments",data:temp.comment}))
            }
        })
    }
}





//GET /tasks/search
// if(method==="GET" && split[1]==="tasks" && split[2]==="search" && split.length===3){
//     // tasks.forEach((temp)=>{    
//     // })
//     console.log("hiiiiiiiiiiiii");
//     console.log(query);
    
//     res.writeHead(200,{'Content-Type':'application/json'});
//     res.end(JSON.stringify({message:"get comments",data:tasks}))
// }


if(method==="GET" && split.length===3 && split[1]==="tasks" && split[2]==="search"){
    let abc=verifyToken(req, res);
    if(abc){
        let arr=[];
        tasks.forEach((temp)=>{
            if(temp.title==queryPara.q || temp.description==queryPara.q){
                arr.push(para)
            }       
        })
        res.writeHead(200,{'Content-Type':'application/json'});
        res.end(JSON.stringify({message:"task searched",data:arr}));
    }
}




// "task not found"



// PATCH /tasks/:id/complete

if(method==="PATCH" && split[1]==="tasks" && split[3]==="complete" && split.length===4){
    let abc=verifyToken(req, res);
    if(abc){
        tasks.forEach((temp)=>{
            if(temp.id==split[2]){
                temp.status="completed";
                res.writeHead(200,{'Content-Type':'application/json'});
                res.end(JSON.stringify({message:"task completed",data:temp}))
                
            }
        })
    }
}


//PATCH /tasks/complete-all

if(method==="PATCH" && split[1]==="tasks" && split[2]==="complete-all" && split.length===3){
    let abc=verifyToken(req, res);
    if(abc){
        let abcd=[];
        tasks.forEach((temp)=>{
            if(temp.status=="pending"){
                temp.status="completed";
                abcd.push(temp)
            }
        })
        res.writeHead(200,{'Content-Type':'application/json'});
        res.end(JSON.stringify({message:"all tasks are completed",data:abcd}))
    }
}
 



// DELETE /tasks/delete-completed
if(method==="DELETE" && split[1]==="tasks" && split[2]==="delete-completed" && split.length===3){
    let abc=verifyToken(req, res);
    if(abc){
            for(let j=tasks.length-1; j>=0;j--){
                if(tasks[j].status === "completed"){
                    tasks.splice(j,1)
                }
            }
        
            res.writeHead(200,{'Content-Type':'application/json'});
            res.end(JSON.stringify({message:"all completed tasks is deleted"}));
    }

}
 


// GET /tasks/due-soon

if(method==="GET" && split[1]==="tasks" && split[2]==="due-soon" && split.length===3){
    let abc=verifyToken(req, res);
    if(abc){
        let arr=[];
        tasks.filter((temp)=>{
        let due=new Date(temp.dueDate);
        let todayDate=new Date();
        let diffTime=due.getTime()-todayDate.getTime();
        let diffDate=diffTime/(1000*3600*24)  
            if(diffDate<=7 && diffDate>0){
                arr.push(temp);
                console.log(diffDate)  
            }
        })
        res.writeHead(200,{'Content-Type':'application/json'});
        res.end(JSON.stringify({message:" Retrieve tasks that are due within a specified timeframe ",data:arr}));
    }
}
  



// GET /tasks/overdue

if(method==="GET" && split[1]==="tasks" && split[2]==="overdue" && split.length===3){
    let abc=verifyToken(req, res);
    if(abc){
        let arr=[];
        tasks.filter((temp)=>{
            let due=new Date(temp.dueDate);
            let currentDate=new Date();
            let diffTime=due.getTime()-currentDate.getTime();
            let diffDate=diffTime/(1000*3600*24);
            if(diffDate<0){
                arr.push(temp);
            }
        })
        res.writeHead(200,{'Content-Type':'application/json'});
        res.end(JSON.stringify({message:"  Return a list of overdue tasks. ",data:arr}))
    }
}
  


// POST /tasks/:id/duplicate

if(method==="POST" && split[1]==="tasks" && split[3]==="duplicate" && split.length===4){
    let abc=verifyToken(req, res);
    if(abc){
        let abcd;
        tasks.filter((temp)=>{
            if(temp.id==split[2]){
                abcd={...temp};
                abcd.id=id++;
                tasks.push(abcd);
            }  
        })
        res.writeHead(200,{'Content-Type':'application/json'});
        res.end(JSON.stringify({message:"  Duplicate an existing task. ",data:abcd}));
    }
}


 

// PATCH /tasks/:id/archive

let arr=[];
if(method==="PATCH" && split[1]==="tasks" && split[3]==="archive" && split.length===4){
    let abc=verifyToken(req, res);
    if(abc){
        let temp;
        // tasks.filter((temp)=>{
        //     if(temp.id==split[2]){
    
        //     }
        // })
        for(let j=tasks.length-1;j>=0;j--){
            if(tasks[j].id==split[2]){
                temp=tasks.splice(j,1);
                arr.push(temp);
                console.log("arr",arr);
            } 
        }
        res.writeHead(200,{'Content-Type':'application/json'});
        res.end(JSON.stringify({message:"Archive tasks that have been completed.",data:temp}));
    }
}

// GET /tasks/archived
if(method==="GET" && split.length===3 && split[2]==="archived" && split[1]==="tasks"){
    let abc=verifyToken(req, res);
    if(abc){
        // console.log("arr",arr);
        res.writeHead(200,{'Content-Type':'application/json'});
        res.end(JSON.stringify({message:"   Return the task with its status set to archived",data:arr}));
    }
}
 




// POST /tasks/bulk

if(method==="POST" && split[1]==="tasks" && split[2]==="bulk" && split.length===3){
    let abc=verifyToken(req, res);
    if(abc){
        let body="";
        req.on("data",(chunk)=>{
            body=body+chunk;
        })
    
        req.on("end",()=>{
            body=JSON.parse(body);
            // tasks.filter((temp)=>{
            //     if()
            // })
            body.forEach((temp)=>{
                temp.id=id++;
                tasks.push(temp);
            })
            res.writeHead(200,{'Content-Type':'application/json'});
            res.end(JSON.stringify({message:" the list of created tasks.",data:body}))
        }) 
    }
}

function verifyToken(req,res){
    const tok=req.headers['authorization'].split(' ')[1];
    if(!tok){
        res.writeHead(401,{'Content-Type':'application/json'});
        res.end(JSON.stringify({message:"unauthorized access"}))
    }
    return tok;
 }

})



server.listen(PORT,()=>{
    console.log(`Server is running at http://localhost:${PORT}`)
})

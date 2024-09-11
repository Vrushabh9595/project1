import { TaskRepository } from "../repository/taskRepository";

let id=1;
export class TaskService{
    constructor(){
        this.taskRepository=new TaskRepository();
    }
    addNewTask(tasks,body){
        // console.log("in service");
        body.id=id++;
        body.history=[];
        body.archive=false;
        this.taskRepository.addNewTask(tasks,body);
        return body;
    }

    getAllTask(tasks){
        return this.taskRepository.getAllTask(tasks);
    }
    getTaskById(tasks,id){
        let val= this.taskRepository.getTaskById(id,tasks);    
        console.log(val,id);
        return val;            
    }
    deleteTaskById(tasks,pathSegments){
        this.taskRepository.deleteTaskById(tasks,pathSegments);

    }
    updateTaskById(tasks,pathSegments,body){
        let val= tasks.find(temp=>temp.id==pathSegments[2])
        if(val){
            return this.taskRepository.updateTaskById(body,val);
        }
    }

    taskPriority(tasks,pathSegments,body){
       let val= tasks.find(temp=>temp.id==pathSegments[2]);
       if(val){
            return this.taskRepository.taskPriority(val,body);
       }

    }
    assignTaskById(tasks,body,pathSegments){
        let val= tasks.find(temp=>temp.id==pathSegments[2]);
       if(val){
            return this.taskRepository.assignTaskById(val,body);
       }
    }

    unassignTask(tasks,pathSegments){
        let val= tasks.find(temp=>temp.id==pathSegments[2]);
        if(val){
             return this.taskRepository.unassignTask(val);
        }
    }

    categorizeTask(tasks,pathSegments,body){
        let val= tasks.find(temp=>temp.id==pathSegments[2]);
        if(val){
             return this.taskRepository.categorizeTask(val);
        }
    }

    taskHistoryTracking(tasks,pathSegments){
        let val= tasks.find(temp=>temp.id==pathSegments[2]);
        if(val){
             return this.taskRepository.taskHistoryTracking(val);
        }
    }

    taskCommenting(tasks,pathSegments,body){
        let val= tasks.find(temp=>temp.id==pathSegments[2]);
        if(val){
             return this.taskRepository.taskCommenting(val,body);
        }
    }

    searchTask(tasks,queryPara,array){
        let val=tasks.find(temp => temp.title==queryPara.q || temp.description==queryPara.q);
        if(val){
            array.push(this.taskRepository.searchTask(val));
        }
        return array;
    }

    taskCompletionById(tasks,pathSegments){
        let val=tasks.find(temp=>temp.id==pathSegments[2]);
        if(val){
            return this.taskRepository.taskCompletionById(val);
        }
    }

    completeAllPendingTask(tasks,array){
        let val=tasks.find(temp=>temp.status!="completed");
        if(val){
            array.push(this.taskRepository.completeAllPendingTask(val));
        }
        return array
    }

    deleteAllCompletedTask(tasks){
        this.taskRepository.deleteAllCompletedTask(tasks);
    }

    dueDateRemainder(tasks,arr){
        tasks.filter((temp)=>{
            let due=new Date(temp.dueDate);
            let todayDate=new Date();
            let diffTime=due.getTime()-todayDate.getTime();
            let diffDate=diffTime/(1000*3600*24)  
            if(diffDate<=7 && diffDate>0){
                return this.taskRepository.dueDateRemainder(temp,arr);
            }
        })
    }

    overdue(tasks,arr){
        tasks.filter((temp)=>{
            let due=new Date(temp.dueDate);
            let currentDate=new Date();
            let diffTime=due.getTime()-currentDate.getTime();
            let diffDate=diffTime/(1000*3600*24);
            if(diffDate<0){
                return this.taskRepository.overdue(temp,arr);
            }
        })

    }

    taskDuplication(tasks,abcd,pathSegments){
        let val=tasks.find(temp=>temp.id==pathSegments[2]);    
        if(val){
            tasks.push(this.taskRepository.taskDuplication(temp,abcd));
        } 
        return tasks;
    }

    archiveCompletedTask(tasks){
        return this.taskRepository.archiveCompletedTask(tasks);
    }

    bulkTAskCreation(body,tasks){
        return this.taskRepository.bulkTAskCreation(body,tasks);
    }
 }
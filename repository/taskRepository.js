export class TaskRepository{
     addNewTask(tasks,body){
        // console.log("in repo");
        // console.log(task);
        tasks.push(body)
    }

    getAllTask(tasks){
       return tasks;
    }

    getTaskById(id,tasks){
     return tasks.find(temp=>temp.id==id);
    }

    deleteTaskById(tasks,pathSegments){
        tasks.splice(pathSegments[2]-1,1);
    }

    updateTaskById(body,temp){
        for(let element in body){
        temp[element]=body[element];
        }
        return temp;
    }

    taskPriority(temp,body){
        temp.priority=body.priority;
        return temp;
    }

    assignTaskById(temp,body){
        temp.assignedTo= body.assignedTo; 
        return temp;
    }

    unassignTask(temp){
        temp.assignedTo=null;
        return temp;
    }

    categorizeTask(temp,body){
        temp.category= body.category; 
        return temp;
    }

    taskHistoryTracking(temp){
        return temp;
    }

    taskCommenting(temp,body){
        temp.comments=body;
        return temp;
    }

    searchTask(temp){
        array.push(temp);
    }

    taskCompletionById(temp){
        temp.status="completed" 
        return temp;          
    }

    completeAllPendingTask(temp){
        temp.status="completed";
    }

    deleteAllCompletedTask(tasks){
        for(let j=tasks.length-1; j>=0;j--){
            if(tasks[j].status === "completed"){
                tasks.splice(j,1)
            }
        }
    }

    dueDateRemainder(temp,arr){
        arr.push(temp);
        return arr;
    }

    overdue(temp,arr){
        arr.push(temp);
    }

    taskDuplication(temp,abcd){
        abcd={...temp};
        abcd.id=id++;
        return abcd;
    }

    archiveCompletedTask(tasks){
        let temp,arr;
        for(let j=tasks.length-1;j>=0;j--){
            if(tasks[j].status=="completed"){
                temp=tasks.splice(j,1);
                arr.push(temp);
                console.log("arr",arr);
            } 
        }
        return arr;
    }

    bulkTAskCreation(body,tasks){
        body.forEach((temp)=>{
            temp.id=id++;
            tasks.push(temp);
        })
        return tasks;
    }
}
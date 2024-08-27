// // arr=[
// //     {id:1,
// //         name:"John",
// //         age:25
// //     },
// //     {
// //         id:2,
// //         name:"Mary",
// //         age:30
// //     },
// //     {
// //         id:3,
// //         name:"David",
// //         age:35
// //     },
// //     {
// //         id:4,
// //         name:"Emily",
// //         age:28
// //     }
// // ]


// // arr.filter((temp)=>{
// //     if(temp.id===2 ){
// //         delete temp();
// //     }
// // })

// // console.log(arr);





// // let arr = [
// //     { id: 1, name: "John", age: 25 },
// //     { id: 2, name: "Mary", age: 30 },
// //     { id: 3, name: "David", age: 35 },
// //     { id: 4, name: "Emily", age: 28 }
// // ];

// // arr.filter((temp) => temp.id !== 2);

// // console.log(arr);




// // let arr=[
// //     {
// //         name:"jhon",
// //         age:30,
// //         address:"sangli",
// //         city:"mumbai",
// //         state:"maharashtra"

// //     },
// //     {
// //         name:"sara",
// //         age:30,
// //         address:"pune",
// //         city:"mumbai",
// //         state:"maharashtra"
// //     },
// //     {
// //         name:"mike",
// //         age:28,
// //         address:"nashik",
// //         city:"mumbai",
// //         state:"maharashtra"
// //     },
// //     {
// //         name:"tom",
// //         age:310,
// //         address:"sangli",
// //         city:"mumbai",
// //         state:"maharashtra"
// //     }
// // ]



// // arr1.forEach((temp,index)=>{
// //     if(temp.age===30){
// //         let abc=arr1.splice(index,1)
// //         console.log(abc)
// //     }
// // })

// // console.log(arr1)


// // for(let i=arr.length-1;i>=0;i--){
// //     if(arr[i].age==30){
// //         let abc=arr.splice(i,1);
// //         console.log("abc",abc)
// //     }
// // }

// // console.log(arr);





// let arr=[
//     {
//         id:1,
//         name:"jhon",
//         age:25,
//         gender:"male",
//         dueDate:"2024-08-29",
//         status:"pending"
//     },
//     {
//         id:2,
//         name:"sara",
//         age:30,
//         gender:"female",
//         dueDate:"2024-09-27",
//         status:"complete"
//     },
//     {
//         id:3,
//         name:"mike",
//         age:28,
//         gender:"male",
//         dueDate:"2024-08-30",
//         status:"pending"
//     },
//     {
//         id:4,
//         name:"tom",
//         age:31,
//         gender:"male",
//         dueDate:"2024-09-15",
//         status:"pending"
//     },
//     {
//         id:5,
//         name:"jerry",
//         age:35,
//         gender:"male",
//         dueDate:"2024-10-5",
//         status:"complete"
//     }
// ]

// let arr2=[]

// arr.filter((temp)=>{
//         let due=new Date(temp.dueDate);
//         let todayDate=new Date();
//         let DiffTime=due.getTime()-todayDate.getTime();
//         let DiffDate=DiffTime/(1000*3600*24);
//         // console.log(DiffDate)
//         if(DiffDate<=7){
//             // console.log(temp)
//             arr2.push(temp)
//         }
// })

// console.log(arr2)













// GET /tasks/overdue


let arr=[
        {
            id:1,
            name:"jhon",
            age:25,
            gender:"male",
            dueDate:"2024-08-25",
            status:"complete"
        },
        {
            id:2,
            name:"sara",
            age:30,
            gender:"female",
            dueDate:"2024-08-19",
            status:"pending"
        },
        {
            id:3,
            name:"mike",
            age:28,
            gender:"male",
            dueDate:"2024-08-30",
            status:"complete"
        },
        {
            id:4,
            name:"tom",
            age:31,
            gender:"male",
            dueDate:"2024-09-10",
            status:"complete"
        },
        {
            id:5,
            name:"jerry",
            age:35,
            gender:"male",
            dueDate:"2024-08-22",
            status:"pending"
        },
        {
            id:6,
            name:"hasy",
            age:45,
            gender:"male",
            dueDate:"2024-08-23",
            status:"pending"
        }  
    ]


    let arr2=[];


// arr.filter((temp)=>{
//     let due=new Date(temp.dueDate);
//     let currentDate=new Date();
//     let diffTime=due.getTime()-currentDate.getTime();
//     let diffDate=diffTime/(1000*3600*24);
//     // console.log(diffDate)
//     if(diffDate<0){
//         // arr2.push(temp)
//         console.log(temp)
//     }
//     // console.log(currentDate)
// })

// let i=7;
// let abc;
// arr.filter((temp)=>{
//     if(temp.id==5){
//         abc={...temp}
//         abc.id=i++
//         arr.push(abc);
        
//     }
    //// if(temp.id==2){
   // //     abc={...temp}
   // //     abc.id=i++
   // //     arr.push(abc);      
   // // }
// })
// console.log(arr)

// let abd;
// arr.filter((temp)=>{
//     if(temp.id===3){
//         abc=arr.splice(0,1)
//         arr2.push(abc);
//         console.log("abc",abc)
//     }
// })
// console.log("arr",arr);
// console.log("arr2",arr2)

let abc;
for(let i=arr.length-1;i>=0;i--){
    if(arr[i].age===35){
        abc=arr.splice(i,1)
        arr2.push(abc);
    }
    if(arr[i].age===31){
        abc=arr.splice(i,1)
        arr2.push(abc);
    }
}
console.log("arr",arr);
console.log("arr2",arr2)

// // let today=new Date()
// //         let diffTime=due.getTime()-today.getTime()
// //         let diffDays=Math.ceil(diffTime/(1000*60*60*24))
// //         if(diffDays<0){
// //             console.log(temp.name,"is overdue")
// //         }else{
// //             console.log(temp.name,"is due in",diffDays,"days")
// //         }

// GET   /tasks/delete-all




// //GET /tasks/:id/delete
// if(method==="GET" && pathname.length===3 && pathname[1]==="tasks"){

// }

// //GET /tasks/delete-all
// if(method==="GET" && pathname.length===3 && pathname[1]==="tasks" && pathname[2]==="delete-all"){

// }
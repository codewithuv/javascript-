// const promisesOne =new Promise(function(resolve,reject ){
//     //Do an async task
//     //DB calls , crypograpy ,network
//     setTimeout(function(){
//         console.log('Async task is compelete');
//         resolve();
//     },1000)
// });

// promisesOne.then(function(){
//     console.log("promise consumed");
// })

// new Promise(function(resolve,reject){
//     setTimeout(function(){
//         console.log("Async task2");resolve();
//     },1000)
// }).then(function(){
//     console.log("Aync 2 resolved");
// })


// const promiseThree =new Promise(function(resolve,reject){
//     setTimeout(function(){
//         resolve({username: "Chai" , email :"chai@example.com"});
//     },1000)
// }).then(function(user){
//     console.log(user);
// })

const promisefour=new Promise(function(resolve,reject){
    setTimeout(function(){
        let error =true;
        // let error =false;
        if (!error){
            resolve({username : "utkarsh" ,password :"123"})
        }else{
            reject('ERROR: Something went wrong')
        }
    },1000)
});

promisefour.then((user)=>{
    console.log(user);
    return user.username
}).then(function(myusername){
    console.log(myusername);
}).catch(function(error){
 console.log(error);
}).finally(()=>{
    console.log("the promise is either resolved or rejected")
})



const promiseFive=new Promise(function(resolve,reject){
    setTimeout(function(){
        let error =true;
        // let error =false;
        if (!error){
            resolve({username : "javascript" ,password :"123"})
        }else{
            reject('ERROR:javascript has error')
        }
    },1000)
});
async function consumepromiseFive(params) {
    try{
        const response =await promiseFive
    conslog.log(response);
    }catch(error) {
        console.log("error")
    }
}
consumepromiseFive()




// async function getAllUsers() {
//     const response= await fetch('https://jsonplaceholder.typicode.com/users');
//     console.log(response);
//     const data=await response.json();
//     console.log(data);
// }
// getAllUsers();

fetch('https://jsonplaceholder.typicode.com/users')
.then(function(response){
    return response.json()
}).then((data)=>{
    console.log(data);
})
.catch((error)=>{
    console.log(error);
})
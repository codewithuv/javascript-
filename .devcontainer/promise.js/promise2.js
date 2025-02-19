let p1=new Promise((resolve, reject )=>{
    setTimeout(()=>{
        console.log("My first promise");
        resolve(100);
    },2000)
})
p1.then(function(value){
    console.log(value);
    let p2=new Promise((resolve, reject)=>{
        console.log("My Second promise");
        resolve(200);
    })
    return p2
}).then((value1)=>{
    console.log(value1);
    console.log("Promise2")
})
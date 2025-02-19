const mypromise = new Promise((resolve,reject)=>{
  
    setTimeout(() => {
        const success = true;
        if (success ){
            resolve("Data fetcehed suceesfully");
            reject("Error fetching data")
        }
    },1000);
    });
    mypromise.then((result)=>{
        console.log("Sucess : ", result);
        return "More data";
    })
    .then((result)=>{
        console.log("sucess2 :")
    })
    .catch()
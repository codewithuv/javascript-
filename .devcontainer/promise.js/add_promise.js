function add(a, b) {
    return new Promise((resolve,reject) => {
      if(a==0 && b==0) {reject("fail")}
       else { resolve(a + b);}
    });
  }
  
  add(10, 3).then(function (result) { console.log(result)})
  .catch(console.log("no addition"))
  
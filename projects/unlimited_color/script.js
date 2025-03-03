//genreate   a random color

const randomColor =function(){
    const hex ='0123456789ABCDEF'
    let color ='#'
    for(let i=0;i<6;i++)
    {    color +=hex[Math.floor(Math.random()*16)] }
    return color;

}
console.log(Math.floor(Math.random()*16));
let intervalId;



function startChangingColor(){
    intervalId=setInterval(changeBackgroundcolor,1000 );
    function changeBackgroundcolor(){
    document.body.style.backgroundColor= randomColor();}
}


function stopChangingColor(){
    console.log("Stopped");
    clearInterval(intervalId);
    // intervalId=null;
}

 


document.querySelector('#start').addEventListener('click',
    startChangingColor)

document.querySelector('#stop').addEventListener('click',
    stopChangingColor)


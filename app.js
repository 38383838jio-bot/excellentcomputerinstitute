function startCode() {
    console.log("am running");
    const losdrt = document.getElementById("losdrt");
    const loju = document.getElementById("loji");
    const loi = document.getElementById('loi');

    loju.addEventListener("click" , ()=>{
        losdrt.style.width="40%"; 
    })
 
    loi.addEventListener("click" , ()=>{
        losdrt.style.width="0%"; 
    }) 
} 
startCode();

function Startcoder2() {
    console.log("am running on code 2")
}
Startcoder2()
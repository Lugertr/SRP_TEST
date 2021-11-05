//import Generate from "./src/Generate.js";
//import Hash from "./src/Hash.js";
import SRP from "./src/SRP.js";
import Data from "./src/Storage.js";
//import HashOne from "./src/ShaOne.js";

const reg = document.getElementById("button");
const log = document.getElementById("btn");
const  Srptest = new SRP();

reg.addEventListener("click", ()=>{
let login = document.getElementById("key").value;
let password = document.getElementById("fkey").value;
if ((login !='') && (password!='')) {
Srptest.reg(login,password);
}
else {
    alert("Заполните все поля!")
}
});

log.addEventListener("click", ()=>{
    let login = document.getElementById("key").value;
    let password = document.getElementById("fkey").value;
    if ((login !='') && (password!='')) {
    Srptest.log(login,password);
    }
    else {
        alert("Заполните все поля!")
    }
    });

    window.onbeforeunload = closingCode;
    function closingCode(){
        this.Database.clear();
   return null;
}

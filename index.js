import SRP from "./src/SRP/DoSRP.js";
import HashOne from "./Instruments/ShaOne.js";
import Hash from "./Instruments/Hash.js";
import DoDF from "./src/DiffiHelman/DoDF.js";
import DoRSA from "./src/RSA/DoRSA.js";


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

const sha = document.getElementById("sha");
const hash = document.getElementById("hash");

sha.addEventListener("click", ()=>{
  const Sha = new Hash();
  document.getElementById('ShaName').textContent = Sha.hash(document.getElementById("hashingSHA").value);
});

hash.addEventListener("click", ()=>{
  const OwnHash = new HashOne();
  document.getElementById('HashName').textContent = OwnHash.hash(document.getElementById("hashing").value);
});

var tabNavs = document.querySelectorAll(".nav-tab");
var tabPanes = document.querySelectorAll(".tab-pane");

for (var i = 0; i < tabNavs.length; i++) {
  tabNavs[i].addEventListener("click", function(e){
    e.preventDefault();
    var activeTabAttr = e.target.getAttribute("data-tab");

    for (var j = 0; j < tabNavs.length; j++) {
      var contentAttr = tabPanes[j].getAttribute("data-tab-content");

      if (activeTabAttr === contentAttr) {
        tabNavs[j].classList.add("active");
        tabPanes[j].classList.add("active"); 
      } else {
        tabNavs[j].classList.remove("active");
        tabPanes[j].classList.remove("active");
      }
    };
  });
}

const DF = document.getElementById("DiffiHelman");
const RSA = document.getElementById("RSA");

DF.addEventListener("click", ()=>{
  const doDiFi = new DoDF();
});

RSA.addEventListener("click", ()=>{
  const RSAgo = new DoRSA();
});
import Generate from "../../Instruments/Generate.js";
import HashOne from "../../Instruments/ShaOne.js";
import DataBase from "../../Instruments/Storage.js"



export default class ServerSRP{
    N;
    k;
    OurData = []
    g;
    v;
    s;
    b;
    A;
    B;
    i=0;
    M1;
    M2;
    Ss;
    //H = new Hash();
    H = new HashOne();
    gen = new Generate();
    Database = new DataBase();

    constructor(g,N,k) {
        this.Database.clear();
        this.g = g;
        this.N = BigInt(N);
        this.k = BigInt(k); 
        Gmean.innerHTML = this.g;
        Kmean.innerHTML = this.k;
    }
    

    reg(l,v,s)
    {   
        let d = [];
        if (this.Database.get(l)!= null)
        {
            alert("Такой пользователь уже зарегестрирован!");
            return

        }

        d.push(l,v,s)
       this.Database.add(...d);
       this.showTable();
    }


    async showTable(){
        let tableData = document.getElementsByClassName('ChangingClass')
        for (var i = tableData.length - 1; i >= 0; --i) {
            tableData[i].remove();
          }
        // console.log(tableData)
        // while (tableData[0])
        // {  
        //     tableData.parentNode.removeChild(tableData[0]);
        // }
        for (let i=0;i<this.Database.getSize();i++)
        {   
            let n = this.Database.showKey(i);
            let text = this.Database.get(n).split(" ");

            //let tr = table;
            //let newRow = tr.insertRow(-1);

            //let log = newRow.insertCell(0); 
            //let TextLog = document.createTextNode(n);
            //let TextLog = document.createElement('div');
            //TextLog.className = "ChangingClass Tel";

            const TextLog = document.createElement("div")
            TextLog.className = "Tel";
            TextLog.classList.add('ChangingClass');
            TextLog.innerHTML = n;

            //let sol = newRow.insertCell(1); 
            //const TextSol = document.createTextNode(text[1]);
            // TextSol.className("ChangingClass", "Tel");
            //const TextSol = document.querySelector('div.Tel');
            //const TextSol = document.createTextNode(text[1]);
            const TextSol = document.createElement("div")
            TextSol.className = "Tel";
            console.log(TextSol)
            TextSol.classList.add('ChangingClass');
            TextSol.innerHTML = text[1];

            //let ver = newRow.insertCell(2); 
            // let TextVer = document.createTextNode(text[0]);
            // TextVer.classList.add("ChangingClass", "Tel");

            const TextVer = document.createElement("div.Tel")
            TextVer.className = "Tel";
            TextVer.classList.add('ChangingClass');
            TextVer.innerHTML = text[0];

            //let dell = newRow.insertCell(3); 
            let btn = document.createElement("button");
            btn.className = "Tel";
            btn.innerHTML = "Delete";
            btn.name = n;
            btn.style.height = '100%';
            btn.style.width = "100%";
            btn.classList.add("ChangingClass")

              btn.addEventListener('click', event => {
                this.deleteOneReg(btn.name)
            });
        
            let UserBase = document.getElementById("UserBase");
            UserBase.appendChild(TextLog);
            UserBase.appendChild(TextSol);
            UserBase.appendChild(TextVer);
            UserBase.appendChild(btn);

        }
    }


    deleteOneReg(btn) 
    {  
        this.Database.deleteEl(btn);
        this.showTable();
    }


    log(l,A)
    {   try {
        if (A!=0)
        { 
            this.A = A;
            if (this.Database.get(l)!=null)
            {
                let text = this.Database.get(l).split(" ");
                this.v = BigInt(text[0]);
                this.s = text[1];


                this.b = this.gen.create(16);
                this.B = this.k*this.v+this.expmod(this.g,this.b,this.N);

            }
            else {
                return [0,0,false]
            }
        }
        return [this.B,this.s,true]
    }
    catch {
        alert("Не удалось найти пользователя")
    }
    }

    stepTWOS() {
        let u = this.H.hash(this.A.toString()+this.B.toString(),1);
        console.log("server A:")
        console.log(this.A)
        console.log("server B:")
        console.log(this.B)
        u = BigInt(u);
        this.Ss = this.expmod((this.A*(this.expmod(this.v,u,this.N))),this.b,this.N);
    }

    chekM1(M1) {
        console.log("server S:")
        console.log(this.Ss)
        this.M1 = BigInt(this.H.hash((this.A.toString()+this.B.toString()+this.Ss.toString()).toString(),1));
        
        if (this.M1!=M1)
        {
            return false
        }
        else {
            return true
        }
    }

    createM2()
    {
        this.M2 = BigInt(this.H.hash((this.A.toString()+this.M1.toString()+this.Ss.toString()).toString(),1));
        return this.M2
    }

    show() {
        MS1.innerHTML = this.M1.toString(16);
        MS2.innerHTML = this.M2.toString(16);
    }

    expmod( base, exp, mod ){
        if (exp == 0) return 1n;
        if (exp % 2n == 0){
          return this.expmod( base, (exp / 2n), mod)**2n % mod;
        }
        else {
          return (base * this.expmod( base, (exp - 1n), mod)) % mod;
        }
      }

}

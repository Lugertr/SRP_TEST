import Generate from "./Generate.js";
//import Hash from "./Hash.js";
import HashOne from "./ShaOne.js";
import Data from "./Storage.js"



export default class Server{
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
    Database = new Data();

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
        let d= [];
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
        let table = document.getElementById("tableId");
        while (table.rows.length>2)
        {
            table.deleteRow(-1);
        }
        for (let i=0;i<this.Database.getSize();i++)
        {   
            let n = this.Database.showKey(i);
            let text = this.Database.get(n).split(" ");

            let tr = table;
            let newRow = tr.insertRow(-1);

            let log = newRow.insertCell(0); 
            let TextLog = document.createTextNode(n);

            let sol = newRow.insertCell(1); 
            let TextSol = document.createTextNode(text[1]);

            let ver = newRow.insertCell(2); 
            let TextVer = document.createTextNode(text[0]);

            let dell = newRow.insertCell(3); 
            let btn = document.createElement("button");
            btn.innerHTML = "Delete";
            btn.name = n;
            btn.style.height = '50px';
            btn.style.width = "100%";

              btn.addEventListener('click', event => {
                this.deleteOneReg(btn.name)
            });
        

            dell.appendChild(btn);
            log.appendChild(TextLog);
            sol.appendChild(TextSol);
            ver.appendChild(TextVer);
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
        console.log(this.A)
        console.log(this.B)
        console.log("server U:")
        console.log(u)
        u = BigInt(u);
        console.log(u+" uS")
        this.Ss = this.expmod((this.A*(this.expmod(this.v,u,this.N))),this.b,this.N);
    }

    chekM1(M1) {

        console.log(this.Ss+ " Ss")
        this.M1 = BigInt(this.H.hash((this.A.toString()+this.B.toString()+this.Ss.toString()).toString(),1));
        console.log(this.M1+" M1")
        
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
        console.log("TEST SER")
        console.log(this.A + " A SER")
        console.log(this.B + " B SER")
        console.log(this.Ss + " SC SER")
        console.log(this.M1 + " M1 SER")
        console.log(this.M2 + " M2 SER")
        return this.M2
    }

    show() {
        //AAA.innerHTML = this.A + " A";
        //BBB.innerHTML = this.B; + " B"
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

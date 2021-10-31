import Generate from "./Generate.js";
//import Hash from "./Hash.js";
import HashOne from "./ShaOne.js";
import Data from "./Storage.js"



export default class Server{
    Tr=0;
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
        // for (let q=0;q<this.OurData.length;q++)
        // {
        //     if (l==this.OurData[q][0])
        //     {
        //         alert("Такой пользователь уже зарегестрирован!");
        //         return
        //     }
        // }
        if (this.Database.get(l)!= null)
        {
            alert("Такой пользователь уже зарегестрирован!");
            return

        }

        d.push(l,v,s)
       //this.OurData.push(d);
       this.Database.add(...d);
       alert("Успех")
       this.showTable();
       //this.regN+=1;
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

            let dell = newRow.insertCell(2); 
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
            //T2.innerHTML = text[1];
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
            // while ((this.OurData[this.i][0]!=l) )
            // {   
            //     if ((this.OurData.length<=this.i)) {
            //         this.B=0;
            //         return [this.B,0,false]
            //     }
            //     this.i+=1;
            // }

                this.b = this.gen.create(16);
                this.B = this.k*this.v+this.expmod(this.g,this.b,this.N);
            //this.B = this.k*this.OurData[this.i][1]+this.expmod(this.g,this.b,this.N);
            //this.B = 2n*this.Data[this.i][1]+this.g**this.b;
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
        //let u = BigInt(this.H.hash(this.A.toString()+this.B.toString(),1));
        let u = this.H.hash(this.A.toString()+this.B.toString(),1);
        console.log(this.A)
        console.log(this.B)
        console.log("server U:")
        console.log(u)
        u = BigInt(u);
        //let Ss = (this.A*(this.Data[this.i][1]))**this.b;
        console.log(u+" uS")
        this.Ss = this.expmod((this.A*(this.expmod(this.v,u,this.N))),this.b,this.N);
    }

    chekM1(M1) {

        console.log(this.Ss+ " Ss")
        this.M1 = BigInt(this.H.hash((this.A.toString()+this.B.toString()+this.Ss.toString()).toString(),1));
        console.log(this.M1+" M1")
        
        if (this.M1!=M1)
        {
            console.log("fail")
        }
        else {
            console.log("GOOD")
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

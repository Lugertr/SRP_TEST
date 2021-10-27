import Generate from "./Generate.js";
import Hash from "./Hash.js";

export default class Server{
    N;
    k;
    Data = []
    g;
    b=0;
    A;
    B;
    i=0;
    M1;
    M2;
    Ss;
    H = new Hash();
    gen = new Generate();

    constructor(g,N,k) {
        this.g = g;
        this.N = BigInt(N);
        this.k = BigInt(k);
    }
    

    reg(l,v,s)
    {   let d= [];
        for (let q=0;q<this.Data.length;q++)
        {
            if (l==this.Data[q][0])
            {
                alert("Такой пользователь уже зарегестрирован!");
                return
            }
        }
        d.push(l,v,s)
       this.Data.push(d);
       alert("Успех")
        //console.log(this.Data)
    }

    log(l,A)
    {   try {
        if (A!=0)
        {  this.A = A;
            while ((this.Data[this.i][0]!=l) )
            {   
                if ((this.Data.length<=this.i)) {
                    this.B=0;
                    return [this.B,0,false]
                }
                this.i+=1;
            }
            this.b = this.gen.create(16);
            this.B = this.k*this.Data[this.i][1]+this.expmod(this.g,this.b,this.N);
            //this.B = 2n*this.Data[this.i][1]+this.g**this.b;
        }
        //console.log( [this.B,this.Data[this.i][2]])
        return [this.B,this.Data[this.i][2],true]
    }
    catch {
        alert("Не удалось найти пользователя")
    }
    }

    stepTWOS() {
        let u = BigInt(this.H.hash(this.A.toString()+this.B.toString(),1));
        //let Ss = (this.A*(this.Data[this.i][1]))**this.b;
        console.log(u+" uS")
        this.Ss = this.expmod((this.A*(this.expmod(this.Data[this.i][1],u,this.N))),this.b,this.N);
        this.i = 0;
        //console.log(this.Ss+" As ")
        //console.log(this.B+" Bs ")
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
        return this.M2
    }

    show() {
        //AAA.innerHTML = this.A + " A";
        //BBB.innerHTML = this.B; + " B"
        MS1.innerHTML = this.M1.toString(16) + " M1 СЕРВЕРА";
        MS2.innerHTML = this.M2.toString(16) + " M2 СЕРВЕРА";
        //console.log(this.Data)
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
import Generate from "./Generate.js";
import Hash from "./Hash.js";

export default class Client{
    N;
    solt;
    x;
    v;
    login;
    password;
    g;
    a;
    k;
    A;
    B;
    Sc;
    M1;
    M2;
    H = new Hash();

    constructor(g,k,N)
    {   this.g = BigInt(g);
        this.k = BigInt(k);
        this.N = BigInt(N);
        //console.log(this.N)
    }

    reg(login,password)
    {
        this.login = login;
        this.password = password;

        this.solt = new Date().toString();
        this.solt = this.solt.replace(/[^0-9]/g, '');

        this.x = BigInt(this.H.hash(this.solt+this.password,1));
        //this.x=3n;
        //this.v = (this.g**this.x) % this.N;
        this.v = this.expmod(this.g,this.x,this.N)
        //console.log(this.v)
        //this.v = this.g**this.x;
        return [this.login,this.v,this.solt]
    }

    loginS(login,password) {
        this.login = login;
        this.password = password;
        const gen = new Generate();
        this.a = gen.create(16);
        this.A = this.expmod(this.g,this.a,this.N)
        //this.A = this.g**(this.a % this.N);
        //this.A = this.g**this.a;
        return [login,this.A]
    }

    stepTWO(B,s) {
        if (B!=0)
        {   this.B = B;
            this.x = BigInt(this.H.hash(s+this.password,1));
            //console.log(this.H.hash(this.A.toString()+B.toString(),1))  
            //this.x = H.hash(this.solt+this.password);
            let u = BigInt(this.H.hash(this.A.toString()+B.toString(),1));
            //console.log(this.g**(this.x % this.N))
            // console.log(this.B + " B")
            // console.log(this.k + " k")
            // console.log(this.g + " g")
            // console.log(this.x + " x")
            // console.log(this.N + " N")
            // console.log(this.a + " a")
            // console.log(u+" uC")

            //this.Sc =(BigInt(B)-BigInt(this.k*this.g**(this.x % this.N))**((this.a+u*this.x)% this.N));
            this.Sc =this.expmod((BigInt(this.B)-(this.k*this.expmod(this.g,this.x,this.N))),(this.a+u*this.x),this.N);

            //this.Sc =(BigInt(B)-BigInt(this.k)*(this.g**this.x))**(this.a+this.x);
            //let Sc =(B-this.k*(this.g**this.x))**(this.a+u*this.x);
            console.log(this.Sc+ " Sc")
            //console.log(this.A+" AC ")
            //console.log(B+" BC ")
        }
    }

    createM1() {
        console.log(this.B+" B")
        this.M1 = BigInt(this.H.hash((this.A.toString()+this.B.toString()+this.Sc.toString()).toString(),1));
        console.log(this.M1+" M1")
        return this.M1;   
    }

    chekM2(M2)
    {   
        this.M2 = BigInt(this.H.hash(this.A.toString()+this.M1.toString()+this.Sc.toString(),1));
        if (this.M2!=M2)
        {
            console.log("fail")
        }
        else{ console.log("OK")
        //const content = document.body.innerHTML;
        //document.body.innerHTML = "Это просто текст";
        }
        console.log(this.M2+" M2")
        console.log(M2+" M2 SERVER")
    }

    show() {
        MC1.innerHTML = this.M1.toString(16) + " М1 КЛИЕНТА";
        MC2.innerHTML = this.M2.toString(16) + " М2 КЛИЕНТА";
    }

    expmod( base, exp, mod ) {
        if (exp == 0) return 1n;
        if (exp % 2n == 0){
          return this.expmod( base, (exp / 2n), mod)**2n % mod;
        }
        else {
          return (base * this.expmod( base, (exp - 1n), mod)) % mod;
        }
      }
}


import Generate from "../../Instruments/Generate.js";
//import Hash from "./Hash.js";
import HashOne from "../../Instruments/ShaOne.js";

export default class ClientSRP{
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
    H = new HashOne();

    constructor(g,k,N)
    {   this.g = BigInt(g);
        this.k = BigInt(k);
        this.N = BigInt(N);
    }

    reg(login,password)
    {
        this.login = login;
        this.password = password;

        this.solt = new Date().toString();
        this.solt = this.solt.replace(/[^0-9]/g, '');

        this.x = BigInt(this.H.hash(this.solt+this.password,1));
        this.v = this.expmod(this.g,this.x,this.N)
        return [this.login,this.v,this.solt]
    }

    loginS(login,password) {
        this.login = login;
        this.password = password;
        const gen = new Generate();
        this.a = gen.create(16);
        this.A = this.expmod(this.g,this.a,this.N)
        return [login,this.A]
    }

    stepTWO(B,s) {
        if (B!=0)
        {   this.B = B;
            this.x = BigInt(this.H.hash(s+this.password,1));

            let u = this.H.hash(this.A.toString()+this.B.toString(),1);
            u = BigInt(u);
            this.Sc =this.expmod((BigInt(this.B)-(this.k*this.expmod(this.g,this.x,this.N))),(this.a+u*this.x),this.N);
            console.log("client S:")
            console.log(this.Sc)
        }
    }

    createM1() {
        console.log("client B:")
        console.log(this.B)

        console.log("client A:")
        console.log(this.A)

        this.M1 = BigInt(this.H.hash((this.A.toString()+this.B.toString()+this.Sc.toString()).toString(),1));
        return this.M1;   
    }

    chekM2(M2)
    {   
        this.M2 = BigInt(this.H.hash(this.A.toString()+this.M1.toString()+this.Sc.toString(),1));
        if (this.M2!=M2)
        {
            alert("Неправильный пароль!")
        }
    }

    show() {
        MC1.innerHTML = this.M1.toString(16);
        MC2.innerHTML = this.M2.toString(16);
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


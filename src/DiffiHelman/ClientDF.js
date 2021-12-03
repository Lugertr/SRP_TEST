import Generate from "../../Instruments/Generate.js";

export default class ClientDF {
    g;p;name;a;A;K;
    textarea;

    constructor(g,p,name,textarea) {
        this.name = name;
        this.generateSecret(g,p);
        this.textarea = textarea;

    }

    generateSecret(g,p) {
        const gen = new Generate();
        this.g = g;
        this.p = p;
        this.a = gen.create(4);
        this.A = this.CulcA();
    }

    CulcA() {
        return this.expmod(this.g,this.a,this.p)
    }
    
    getA() {
        return this.A
    }

    ShowCLInfo() {
        this.textarea.value += (`Client ${this.name}\n${this.name[0]} = ${this.A}\n\n`)
    }

    ShowPandG() {
        this.textarea.value +=("p = " + this.p + "; g = " + this.g)
    }

    CreateK(B) {
        this.K = this.expmod(B,this.a,this.p);
    }

    ShowK()
    {
        this.textarea.value +=(`\n${this.name} got K = ${this.K}`)
        return this.K;
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
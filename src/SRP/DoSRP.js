import Generate from "../../Instruments/Generate.js";
import ClientSRP from "./ClientSRP.js";
import ServerSRP from "./ServerSRP.js";

export default class DoSPR{

    Steve;
    Alice;

    constructor(l,p)
    {  let q,N;
        const gen = new Generate();
        do {
        q = gen.create(10);
        N = q*2n+1n;
        }
        while  (!gen.isPrime(N,gen.log2(N)))

        let k=3;
        let g=2n;

        this.Alice = new ClientSRP(g,k,N);
        this.Steve = new ServerSRP(g,N,k);
    }


    reg(l,p) {
       
        this.Steve.reg(...this.Alice.reg(l,p));
    }

     log(l,p)
    {
        let i = this.Steve.log(...this.Alice.loginS(l,p));
        if (i[2]!=false)
        {
            this.Alice.stepTWO(...i);
            this.Steve.stepTWOS();
            let a = this.Steve.chekM1(this.Alice.createM1());
            this.Alice.chekM2(this.Steve.createM2(),a);
            this.Steve.show();
            this.Alice.show();
        }
        else {
            alert("Не удалось найти пользователя")
        }
    }
}
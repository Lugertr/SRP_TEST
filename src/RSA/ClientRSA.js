import Generate from "../../Instruments/Generate.js";

export default class ClientRSA {
   Opkey=[];Clkey=[];
   mes;
   c;
   textarea;

    constructor(tarea) {
        let eil,e,n,d=0,p,q;
        const gen = new Generate();
        this.textarea = tarea;

        do {
            p = Number(gen.create(6));
            q = Number(gen.create(6));
         } 
         while (p==q)

        n = Number(p*q);
        eil = this.lcm((p-1),(q-1));
         do {
         e = Number(gen.create(4));
        } while ((e>=eil) && (eil % e == 0))

        this.Opkey.push(e);
        this.Opkey.push(n);


        d = this.modInverse(e,eil);
    
        this.Clkey.push(d);
        this.Clkey.push(n);

        this.textarea.value += `Открытый ключ: ${this.Opkey}\n`;
        this.textarea.value += `Закрытый ключ: ${this.Clkey}\n`;
    }

    getKey() {
        return this.Opkey
    }

    sendM() {
        // const gen = new Generate();
        // do {
        // this.mes = Number(gen.create(2));
        // } while (this.mes>(this.n-1))
        this.mes = document.getElementById("messageRSA").value;
        if (!(isNaN(this.mes)))
        {
            this.textarea.value += `\nсообщение Боба: ${this.mes}\n`;
            return this.mes
        }
        alert("Нужно ввести число!")
        return 0;
    }

    crypt(mes,e,n) {
        this.c = this.expmod(BigInt(mes),BigInt(e),BigInt(n));
        return this.c
    }

    encrypt(Cmes) {
        console.log([Cmes,this.Clkey])
        this.mes = this.expmod(Cmes,BigInt(this.Clkey[0]),BigInt(this.Clkey[1]))
        this.textarea.value += `Рассшифровка Алисы: ${this.mes}`;
    }

    lcm(a,b) {
        let hcf;
        for (let i = 1; i <= a && i <= b; i++) {
            if( a % i == 0 && b % i == 0) {
                hcf = i;
            }
        }
        return (a * b) / hcf;
    }

   xgcd(a, b) { 

        if (b == 0) {
          return [1, 0, a];
        }
     
        let temp = this.xgcd(b, a % b);
        let x = temp[0];
        let y = temp[1];
        let d = temp[2];
        return [y, x-y*Math.floor(a/b), d];
      }

      modInverse(a, m)
      {
          let m0 = m;
          let y = 0;
          let x = 1;
       
          if (m == 1)
              return 0;
       
          while (a > 1)
          {
               
              let q = parseInt(a / m);
              let t = m;

              m = a % m;
              a = t;
              t = y;
       
              y = x - q * y;
              x = t;
          }
       
          if (x < 0)
              x += m0;
       
          return x;
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

      text2Binary(string) {
        return string.split('').map(function (char) {
            let a = char.charCodeAt(0).toString(2);
             return a
        }).join('');
    }

    // returnText(string) {
    //     return string.split('').map(function (char) {
    //         let a = char.charCodeAt(0).toString(2);
    //          while (a.length<8) {
    //              a = '0' + a;
    //          }
    //          return a
    //     }).join('');
    // }
   
}
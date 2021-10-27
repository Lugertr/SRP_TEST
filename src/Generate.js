export default class Generate{
    RBigint=0n;
    size;
    
    constructor() {
    }

    create(a)
    {  this.size = a;
        do {
            this.RBigint = BigInt(this.randomize().toString())
            }
        while (!this.isPrime(this.RBigint,this.log2(this.RBigint)))
    
        return this.RBigint
    }

    show() {
        let a = '';
        while (this.RBigint.toString().length<this.size)
        {a = a + '0';}
        return a+this.RBigint.toString()
    }

    log2(n) { 
        return parseInt(n.toString(2).length - 1)
      }

    randomize(Ch=false,n=BigInt(0)) {
        let stroka = '';
        do {
            stroka = '';
            for (var i = 0;i<this.size;i++) {
        let OneNumber = Math.round(Math.random() * 9).toString();
        stroka += OneNumber;
        }
        if ((Ch) && (BigInt(stroka)>=2)) {
            if (BigInt(stroka)<=BigInt(n))
            Ch=false;
        }
        } while ((Ch) || ((BigInt(stroka)%2n)==0));
        return stroka;
    }

    miillerTest(d, n)
{
     
    // a = [2..n-2]
    let a = BigInt(this.randomize(true,n));
    //let a = BigInt((2 + Math.floor(BigInt(Math.random()) * (n-2n)) % (n - 4n)).toString());
    //let a = BigInt((2n + (Math.random() * (n-2n)) % (n - 4n)).toString());


    //  a^d % n
    let x = this.power(a, d, n);
 
    if (x == 1 || x == n-1n)
        return true;
 
    while (d != n-1n)
    {
        x = (x * x) % n;
        d *= 2n;
 
        if (x == 1n)    
            return false;
        if (x == n-1n)
              return true;
    }
    return false;
}
 
isPrime( n, k)
{
    if (n <= 1 || n == 4) return false;
    if (n <= 3) return true;
 
    
    let d = n - 1n;
    while (d % 2n == 0)
        d /= 2n;

    for (let i = 0; i < k; i++)
        if (!this.miillerTest(d, n))
            return false;
 
    return true;
}

power(x, y, p)
{
     
    let res = 1n;
    x = x % p;
    while (y > 0)
    {
        if (y & 1n)
            res = (res*x) % p;
 
        y = y>>1n;
        x = (x*x) % p;
    }
    return res;
}
 

}
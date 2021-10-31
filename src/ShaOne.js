export default class HashOne {
    result;

    constructor()
    { 

    }

    hash(message,s=3) {
let mes;
let m;
let Size = 448;
let n = 1;
let w = [];

let h0 = 0x6A09E667;
let h1 = 0xBB67AE85;
let h2 = 0x3C6EF372;
let h3 = 0xA54FF53A;
let h4 = 0x510E527F;
let h5 = 0x9B05688C;
let h6 = 0x1F83D9AB;
let h7 = 0x5BE0CD19;


    mes = this.text2Binary(message);

    while (Size<=mes.length)
    {   n +=1;
        Size = (512*n) - 64; 
    }
    m = this.fillZero(mes + '1',Size)  + this.fillLenght(mes);


    for (let nn=0;nn<n;nn++)
    {
  w[nn]=this.createW(m.substring(512*(nn),512*(nn+1)));
while (w[nn].length<64) {
    w[nn].push('00000000000000000000000000000000');
    //w.push(this.fillLenght(mes));
}
for (let i=16;i<64;i++) {
    let s0 = this.XOR(this.rotateRight(w[nn][i-15],20), this.rotateRight(w[nn][i-15],15), this.Rshift(w[nn][i-15],30));
    //let s1 = this.XOR(this.rotateRight(w[nn][i-2],17) ,this.rotateRight(w[nn][i-2],19) , this.Rshift(w[nn][i-2],10));

    w[nn][i]=this.sum(w[nn][i-16],s0);
    w[nn][i]=this.overflowT(w[nn][i]);

    //w[nn][i]=this.sum(w[nn][i],w[nn][i-7]);
    //w[nn][i]=this.overflowT(w[nn][i]);
    
    //w[nn][i]=this.sum(w[nn][i],s1);
    //w[nn][i]=this.overflowT(w[nn][i]);
    
    }
    let a = h0;
    let b = h1;
    let c = h2;
    let d = h3;
    let e = h4;
    let f = h5;
    let g = h6;
    let h = h7;
    
    for (let i=0;i<64;i++) {
        let S = this.XORforTWO(this.XOR(this.rotateRight(this.forK(a.toString(2)),10),this.rotateRight(this.forK(this.NOT(b.toString(2))),5),this.rotateRight(this.forK(c.toString(2)),15)),w[nn][i]);
        let t2 = S + this.NOT(d);
        while (t2.length>32) {
            t2=t2.substring(1)
                }

                let S1 = this.XORforTWO(this.XOR(this.rotateRight(this.forK(e.toString(2)),4),this.rotateRight(this.forK(this.NOT(f.toString(2))),6),this.rotateRight(this.forK(g.toString(2)),8)),w[nn][i]);
                let t1 = S1 + this.NOT(h);
        while (t1.length>32) {
            t1=t1.substring(1)
        }

        h = g;
        g = f;
        f = e;
        e = d + parseInt(t1,2);
        e = this.overflow(e);
        d = c;
        c = b;
        b = a;
        a = parseInt(t1,2) + parseInt(t2,2);
        a = this.overflow(a);
    }
    
    h0 = this.overflow(h0 + a);
    h1 = this.overflow(h1 + b);
    h2 = this.overflow(h2 + c);
    h3 = this.overflow(h3 + d);
    h4 = this.overflow(h4 + e);
    h5 = this.overflow(h5 + f);
    h6 = this.overflow(h6 + g);
    h7 = this.overflow(h7 + h);
}

    switch(s) {
        case 0:

            return (h0.toString(16)+h1.toString(16)+h2.toString(16)+h3.toString(16)+h4.toString(16)+h5.toString(16)+h6.toString(16)+h7.toString(16))

        case 1:

        return h0.toString(10)+h1.toString(10)+h2.toString(10)+h3.toString(10)+h4.toString(10)+h5.toString(10)+h6.toString(10)+h7.toString(10)

        case 2:

        return [h0,h1,h2,h3,h4,h5,h6,h7]

        default:

            return (this.fillZeroBegin(h0.toString(16))+" "+this.fillZeroBegin(h1.toString(16))
            +" "+this.fillZeroBegin(h2.toString(16))+" "+this.fillZeroBegin(h3.toString(16))+" "+this.fillZeroBegin(h4.toString(16))+
            " "+this.fillZeroBegin(h5.toString(16))+" "+this.fillZeroBegin(h6.toString(16))+" "+this.fillZeroBegin(h7.toString(16)));
    }
    }
    

    hashshow10()
    {
        return 
    }

    overflowT(t) {
        while (t.length>32) {
            t=t.substring(1);
                }
        t=this.forK(t);
        return t;
    }

    overflow(n) {
        let num=n.toString(2);
        if (num.length>32)
        { let p='';
            for (let i=1;i<33;i++)
            {
                p+=num[i];
            }
            return parseInt(p,2)
        }
        return n
    }

text2Binary(string) {
    return string.split('').map(function (char) {
        let a = char.charCodeAt(0).toString(2);
         while (a.length<8) {
             a = '0' + a;
         }
         return a
    }).join('');
}

fillLenght(m) {
    //console.log(m.length)
    //if (m.length<53)
        m = m.length.toString(2);
    //else
    //{   let n = 53;
    //    m = n.toString(2);
    //}

    return (this.fillZero('',62-m.length) + m)
}

fillZero(m,h) {
    while (m.length<=h) {
        m = m + '0';
    }
    return m
}

fillZeroBegin(m,h) {
    while (m.length<=h) {
        m = '0' + m;
    }
    return m
}

createW(m) {
    let out=m[0];
    let w=[];
    for (let i=1;i<m.length;i++) {
        if (i % 32 == 0)
        {   w.push(out);
            out = ''; 
        }
        out +=m[i];
    }
    w.push(out);
    return w
}


rotateRight(s,n) {
    let p ;
        for (let nn=0;nn<n;nn++)
    {   p='';
      for (let i=0;i<s.length-1;i++) 
      {
        p += s[i];
      }
      s = s[s.length-1] + p;
    }
    return s
    }

Rshift(s,n) {
let out='';
let p ;
    for (let nn=0;nn<n;nn++)
{   p='';
  for (let i=0;i<s.length-1;i++) 
  {
    p += s[i];
  }
  s = p;
  out +='0';
}
return out + s
}

sum(s1,s2)
{
    let a = (BigInt(parseInt(s1, 2))+BigInt(parseInt(s2, 2))).toString(2);
    return a
}

XOR(s1,s2,s3)
{ let out='';
    for (let i=0;i<s1.length;i++)
    {
        if (((s1[i]=='0') && (s2[i]=='0') && (s3[i]=='0')) || (((s1[i]=='0') && (s2[i]=='1')) && (s3[i]=='1')) 
        || (((s1[i]=='1') && (s2[i]=='0')) && (s3[i]=='1')) || (((s1[i]=='1') && (s2[i]=='1')) && (s3[i]=='0')))
            out+='0';
        else
            out+='1';
    }
    return out
}

XORforTWO(s1,s2)
{ let out='';
    for (let i=0;i<s1.length;i++)
    {
        if (((s1[i]=='0') && (s2[i]=='0')) || ((s1[i]=='1') && (s2[i]=='1')))
            out+='0';
        else
            out+='1';
    }
    return out
}


AND(a,b)
{let out = '';
    for (let i=0;i<a.length;i++)
    {
        if ((a[i]==1) && (b[i]==1)) {
            out+='1';
        }
        else { 
            out+='0'}
    }
    return out
}

NOT(a)
{let out = '';
for (let i=0;i<a.length;i++)
{
    if (a[i]==1) 
        out+='0';
    else 
        out+='1'
}
return out

}

forK(k)
{
    while (k.length<32)
    {
        k='0'+ k;
    }
    return k
}
}
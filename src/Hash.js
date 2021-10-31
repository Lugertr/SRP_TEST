export default class Hash {
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

 let k =
    [0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5, 0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5,
    0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3, 0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174,
   0xE49B69C1, 0xEFBE4786, 0x0FC19DC6, 0x240CA1CC, 0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA,
    0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7, 0xC6E00BF3, 0xD5A79147, 0x06CA6351, 0x14292967,
    0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13, 0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85,
    0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3, 0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070,
   0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5, 0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3,
    0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208, 0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2]

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
    let s0 = this.XOR(this.rotateRight(w[nn][i-15],7), this.rotateRight(w[nn][i-15],18), this.Rshift(w[nn][i-15],3));
    let s1 = this.XOR(this.rotateRight(w[nn][i-2],17) ,this.rotateRight(w[nn][i-2],19) , this.Rshift(w[nn][i-2],10));

    w[nn][i]=this.sum(w[nn][i-16],s0);
    w[nn][i]=this.overflowT(w[nn][i]);

    w[nn][i]=this.sum(w[nn][i],w[nn][i-7]);
    w[nn][i]=this.overflowT(w[nn][i]);
    
    w[nn][i]=this.sum(w[nn][i],s1);
    w[nn][i]=this.overflowT(w[nn][i]);
    
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
        let sum1 = this.XOR(this.rotateRight(this.forK(a.toString(2)),2), this.rotateRight(this.forK(a.toString(2)),13),this.rotateRight(this.forK(a.toString(2)),22)); 
        //let sum1 = (e >> 2) ^ (e >> 13) ^ (e >> 22);
        let Ma = this.XOR(this.AND(this.forK(a.toString(2)),this.forK(b.toString(2))) ,this.AND(this.forK(a.toString(2)), this.forK(c.toString(2))) ,this.AND(this.forK(b.toString(2)) ,this.forK(c.toString(2))));
        let t2 = this.sum(sum1,Ma);
        while (t2.length>32) {
            t2=t2.substring(1)
                }
    
        let sum2 = this.XOR(this.rotateRight(this.forK(e.toString(2)),6),this.rotateRight(this.forK(e.toString(2)),11),this.rotateRight(this.forK(e.toString(2)),25));
        let Ch = this.XORforTWO((this.AND(this.forK(e.toString(2)),this.forK(f.toString(2)))),(this.AND(this.NOT(this.forK(e.toString(2))), this.forK(g.toString(2)))));
        let t1 = this.sum(this.sum(this.sum(this.sum(this.forK(h.toString(2)),sum2),Ch),this.forK(k[i].toString(2))),w[nn][i]);
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
    //console.log(h0.toString(16))
    
    h0 = this.overflow(h0 + a);
    h1 = this.overflow(h1 + b);
    h2 = this.overflow(h2 + c);
    h3 = this.overflow(h3 + d);
    h4 = this.overflow(h4 + e);
    h5 = this.overflow(h5 + f);
    h6 = this.overflow(h6 + g);
    h7 = this.overflow(h7 + h);

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

        m = m.length.toString(2);


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
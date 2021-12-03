import Generate from "../../Instruments/Generate.js";

export default class ListenerDF {
name;p;g;A;B;
textarea;

    constructor(name,text)
    {
        this.name = name;
        this.textarea = text;
    }

    listen(p,g,A,B) {
        this.p = p;
        this.g = g;
        this.A = A;
        this.B = B;
    }

    Pas() {
        this.textarea.value +=(`\n${this.name} knows:\np = ${this.p}\ng = ${this.g}\nA = ${this.A}\nB = ${this.B}\n`);
    }

    Chek(K)
    {
    
        for (let i=0;i<15;i++)
        {
        let gen = new Generate();
        let r = gen.create(4);
        let b = (this.A**r) % this.p;
        let a = (this.B**r) % this.p;
            if ((b==K) || (a==K)) {
                textarea.value +=("\nEve has a K")
                return 
            } 
        }
        this.textarea.value += ("\nEve doesn't have K");
    }
}
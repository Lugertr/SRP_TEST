import Generate from "../../Instruments/Generate.js";
import ClientDF from "./ClientDF.js";
import ListenerDF from "./ListenerDF.js";

export default class DoDF {

    constructor()
    {
        const gen = new Generate();
        let p;
        let g;
        const textarea = document.getElementById("DFchat");


        do {
        g = gen.create(4);
        p = gen.create(4);
        }
        while (p==g)
        textarea.value = "";
        const Alice = new ClientDF(g,p,"Alice",textarea);
        const Bob = new ClientDF(g,p,"Bob",textarea);
        const Eve = new ListenerDF("Eve",textarea);
        while (Alice.getA() == Bob.getA())
        {  
            g = gen.create(4);
            p = gen.create(4); 
            Alice.generateSecret(g,p); 
            Bob.generateSecret(g,p);
            textarea.value += (Alice.getA(),Bob.getA(),p,g);
        }
        Alice.CreateK(Bob.getA())
        Bob.CreateK(Alice.getA())

        Eve.listen(p,g,Alice.getA(), Bob.getA());

        Alice.ShowCLInfo();
        Bob.ShowCLInfo();
        Eve.Pas();
        Eve.Chek();
        Alice.ShowK();
        Bob.ShowK();

    }

 }
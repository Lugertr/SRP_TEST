import ClientRSA from "./ClientRSA.js";
import Generate from "../../Instruments/Generate.js";

export default class DoRSA{

    constructor() {
        const gen = new Generate();
        const textarea = document.getElementById("RSAchat");


        textarea.value =("Алиса:\n")
        const Alice = new ClientRSA(textarea);
        textarea.value += "Боб:\n" ;
        const Bob = new ClientRSA(textarea);

        Alice.encrypt(Bob.crypt(Bob.sendM(),...Alice.getKey()));
        
        //textarea.value += Alice.modInverse(17,780);
    }


}
import Generate from "./Generate.js";
import Hash from "./Hash.js";
import Client from "./Client.js";
import Server from "./Server.js";
import HashOne from "./ShaOne.js";

export default class SPR{

    Steve;
    Alice;

    constructor(l,p)
    {  
        const gen = new Generate();
        //let q = gen.create(310);
        //let N = q*2n+1n;
        let N ="0xEEAF0AB9ADB38DD69C33F80AFA8FC5E86072618775FF3C0B9EA2314C9C256576D674DF7496EA81D3383B4813D692C6E0E0D5D8E250B98BE48E495C1D6089DAD15DC7D7B46154D6B6CE8EF4AD69B15D4982559B297BCF1885C529F566660E57EC68EDBC3C05726CC02FD4CBF4976EAA9AFD5138FE8376435B9FC61D2FC0EB06E3"

        let k=3;
        let g=2n;

        this.Alice = new Client(g,k,N);
        this.Steve = new Server(g,N,k);
    }

    TestHash()
    {
        const H = new HashOne();
        let ii = [];
        let bb=0;
        let text = "Бенигсен от Горок спустился по большой дороге к мосту, на который Пьеру указывал офицер с кургана как центр позиции и у которого берегу лежали ряды скошенной, пахнувшей сеном травы. Через мост они проехали в село Бородино, оттуда повернули влево мимо огромного количества войск пушек выехали высокому кургану, котором копали землю ополченцы. Это был редут, еще не имевший названия, потом получивший название редута Раевского, или курганной батареи.Пьер обратил особенного внимания этот . Он знал, что место будет для него памятнее всех мест Бородинского поля. поехали овраг Семеновскому, солдаты растаскивали последние бревна изб овинов. под гору вперед поломанную, выбитую, градом, рожь, вновь проложенной артиллерией колчам пашни флеши 1, тоже тогда копаемые. остановился флешах стал смотреть (бывший вчера нашим) Шевардинский , виднелось несколько всадников. Офицеры говорили, там Наполеон Мюрат. все жадно смотрели эту кучку . смотрел туда, стараясь угадать, из этих чуть видневшихся людей . Наконец всадники съехали скрылись. обратился подошедшему нему генералу пояснять положение наших . слушал слова Бенигсена, напрягая свои умственные силы тому, чтобы понять сущность предстоящего сражения, но огорчением чувствовал, способности его этого были недостаточны. ничего понимал. перестал говорить , заметив фигуру прислушивавшегося Пьера, сказал вдруг, обращаясь :— Вам, я думаю, неинтересно?— Ах, напротив, очень интересно, — повторил совсем правдиво. флеш левее дорогою, вьющеюся частому, невысокому березовому лесу. середине леса выскочил перед ними дорогу коричневый белыми ногами заяц , испуганный топотом большого лошадей, так растерялся, долго прыгал впереди их, возбуждая общее внимание смех, , только когда голосов крикнули , бросился сторону скрылся чаще. Проехав версты две , поляну, которой стояли войска корпуса Ту"
        var result = text.split( "\n" ).join( " " ).split( " " );
        for (let i=0;i<result.length;i++)
        {   if (result[i]!=undefined) {
            ii.push(H.hash(result[i],0));
            for(let b=0;b<i;b++)
            {
                if (ii[b]==ii[i])
                {       
                        console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk")
                        console.log(ii[b])
                        console.log(b)
                        console.log(ii[i])
                        console.log(i)
                        console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk")
                        bb=bb+1;
                        b=i;
                }
            }
        } 
    }
        console.log(result[70])
        console.log(result[131])
        console.log(bb)
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
            this.Steve.chekM1(this.Alice.createM1());
            this.Alice.chekM2(this.Steve.createM2());
            this.Steve.show();
            this.Alice.show();
        }
        else {
            alert("Error")
        }
    }
}
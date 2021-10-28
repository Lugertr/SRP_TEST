export default class Data{

    add(l,v,s)
    {   let i = v.toString()+ " " + s.toString();
        localStorage.setItem(l,i);

    }

    get(l)
    {   let i = localStorage.getItem(l);
        return i;
    }

    clear()
    {
        localStorage.clear();
    }

    
}
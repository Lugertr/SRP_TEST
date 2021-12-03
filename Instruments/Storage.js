export default class DataBase{

    add(l,v,s)
    {   let i = v.toString()+ " " + s.toString();
        localStorage.setItem(l,i);

    }

    get(l)
    {   let i = localStorage.getItem(l);
        return i;
    }

    deleteEl(l)
    {
        localStorage.removeItem(l);
    }

    clear()
    {
        localStorage.clear();
    }


    getSize()
    {
        return localStorage.length;
    }
    showKey(i)
    {
            return localStorage.key(i);  
    }

    
}

export class User {

    public nombre: any;
    public email: any;
    public uid: any;

    constructor(
        obj:dataObj
    ){
        this.nombre= obj && obj.nombre || null;
        this.email= obj && obj.email || null;
        this.uid= obj && obj.uid || null;
    }
}

interface dataObj {
    nombre:any;
    uid:any;
    email:any
}
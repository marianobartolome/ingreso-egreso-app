
export class User {

    public nombre: string;
    public email: any;
    public uid: any;

    constructor(
        nombre:string,
        email:any,
        uid:any
    ){
        this.nombre=nombre;
        this.email=email;
        this.uid=uid;
    }
}
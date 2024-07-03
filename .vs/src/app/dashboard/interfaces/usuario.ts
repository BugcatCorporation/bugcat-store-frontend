export interface Usuario{
    idusuario?:number;
    nombre?         : string;
    email?    : string;
    username?    : string;
    admin?: boolean;
    contrasena?    : number;
    direccion?    : string;
    telefono?    : string;
    fechacreacion : Date;
    activo: boolean;
}
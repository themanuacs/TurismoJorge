import { EmpleoyeeInterface } from "./empleoyee.interface";

export interface EmpleoyeeUserInterface{
    id?:number;
    name:string;
    password:string;
    id_empleoyee:number;
    empleoyee:EmpleoyeeInterface;
}
import { EmpleoyeeInterface } from "./empleoyee.interface";
import { ChargeInterface } from "./charge.interface";
import { DepartamentInterface } from "./departament.interface";

export interface ContractInterface{
    id?:number;
    date:Date;
    salary:number;
    state:boolean;
    hours:number;
    days:number;
    name:string;
    id_empleoyee:number;
    empleoyee:EmpleoyeeInterface;
    id_charge:number;
    charge:ChargeInterface;
    id_departament:number;
    departament:DepartamentInterface;
}
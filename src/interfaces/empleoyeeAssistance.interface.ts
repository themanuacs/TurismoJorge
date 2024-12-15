import { ContractInterface } from "./contract.interface";

export interface EmpleoyeeAssistanceInterface{
    id?:number;
    name:string;
    date:Date;
    entry:Date;
    exit:Date;
    id_contract:number;
    contrato: ContractInterface;
}
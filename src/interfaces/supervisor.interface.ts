import { ContractInterface } from "./contract.interface";

export interface SupervisorInterface{
    id?:number;
    name:string;
    id_contrato:number;
    contrato: ContractInterface;
}
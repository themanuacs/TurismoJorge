import { ContractInterface } from "./contract.interface";

export interface PaysheetInterface{
    id?:number;
    name:string;
    start_date:Date;
    end_date:Date;
    id_contract:number;
    contrato: ContractInterface;
}
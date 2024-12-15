import { PaysheetInterface } from "./paysheet.interface";
import { ConceptInterface } from "./concept.interface";

export interface PaysheetDetailInterface{
    id?:number;
    name:string;
    id_paysheet:number;
    paysheet:PaysheetInterface;
    id_concept:number;
    concept:ConceptInterface;
    amount:number;
}
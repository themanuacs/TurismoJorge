import { EmpleoyeeInterface } from "./empleoyee.interface";
import { SupervisorInterface } from "./supervisor.interface";

export interface PerformanceEvaluationInterface{
    id?:number;
    name:string;
    date:Date;
    qualification:number;
    comments:string;
    id_empleoyee:number;
    empleoyee:EmpleoyeeInterface;
    id_supervisor:number;
    supervisor:SupervisorInterface;
}
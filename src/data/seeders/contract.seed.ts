import { ContractInterface } from "../../interfaces";

const contractSeeds: Partial<ContractInterface>[] = [
  {
       id:1,
       date: new Date(2024, 11, 12),
       salary: 1000.50,
       state: true,
       hours: 8,
       days: 5,
       name:"Juan",
       id_empleoyee:1,
       id_charge:1,
       id_departament:1,
  },
];

export{
    contractSeeds
}
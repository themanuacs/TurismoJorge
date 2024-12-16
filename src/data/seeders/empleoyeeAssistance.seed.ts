import { EmpleoyeeAssistanceInterface } from "../../interfaces";

const empleoyeeAssistanceSeeds: Partial<EmpleoyeeAssistanceInterface>[] = [
  {
    id:1,
    name:"Manuel",
    date:new Date(2024, 11, 12),
    entry:new Date(2024, 11, 12),
    exit:new Date(2024, 11, 12),
    id_contract:1,
  },
];

export{
    empleoyeeAssistanceSeeds
}

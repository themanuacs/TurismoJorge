import { PerformanceEvaluationInterface } from "../../interfaces";

const performanceEvaluationSeeds: Partial<PerformanceEvaluationInterface>[] = [
  {
        id:1,
        name:"Manuel",
        date:new Date(2024, 11, 12),
        qualification:20,
        comments:"El mejor trabajador",
        id_empleoyee:1,
        id_supervisor:1,
  },
];

export{
    performanceEvaluationSeeds
}

import { RoleInterface } from "../../interfaces";


const rolesSeeds: Partial<RoleInterface>[] = [
  {
    id:1,
    name: "administrador",
  },
  {
    id:2,
    name: "gerente",
  },
  {
    id:3,
    name: "secretaria",
  },
  {
    id:4,
    name: "maestro pokemon",
  },
];

export{
    rolesSeeds
}

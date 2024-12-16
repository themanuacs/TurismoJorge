import { Sequelize } from "sequelize";
import {
  ChargeModel,
  ConceptModel,
  ContractModel,
  DepartamentModel,
  EmpleoyeeAssistanceModel,
  EmpleoyeeModel,
  EmpleoyeeUserModel,
  PaysheetDetailModel,
  PaysheetModel,
  PerformanceEvaluationModel,
  SupervisorModel,

} from "../models";
const dbName: string | undefined = process.env.DATABASE_NAME
  ? process.env.DATABASE_NAME
  : "api_iwu";
const dbUser: string | undefined = process.env.DATABASE_USER
  ? process.env.DATABASE_USER
  : "root";
const dbPassword: string | undefined = process.env.DATABASE_PASSWORD
  ? process.env.DATABASE_PASSWORD
  : "";
// Instanciamos el objeto Sequelize
const db = new Sequelize(dbName, dbUser, dbPassword, {
  dialect: "mysql",
  host: "localhost",
  logging: false,
});
// CREAMOS LAS TABLAS EN ORDEN ALFABETICO
const ChargeDB = db.define("Charge", ChargeModel);
const ConceptDB = db.define("Concept", ConceptModel);
const ContractDB = db.define("Contract", ContractModel);
const DepartamentDB = db.define("departament", DepartamentModel);
const EmpleoyeeAssistanceDB = db.define("EmpleoyeeAssistance", EmpleoyeeAssistanceModel);
const EmpleoyeeDB = db.define("empleoyee", EmpleoyeeModel);
const EmpleoyeeUserDB = db.define("EmpleoyeeUser", EmpleoyeeUserModel);
const PaysheetDB = db.define("Paysheet", PaysheetModel);
const PaysheetDetailDB = db.define("PaysheetDetail", PaysheetDetailModel);
const PerformanceEvaluationDB = db.define("PerformanceEvaluation", PerformanceEvaluationModel);
const SupervisorDB = db.define("Supervisor", SupervisorModel);

//Relaciones tabla Empleado
EmpleoyeeDB.hasMany(EmpleoyeeUserDB, { foreignKey: "id_empleoyee" });
EmpleoyeeUserDB.belongsTo(EmpleoyeeDB, { foreignKey: "id_empleoyee" });

//Relaciones tabla Contrato
ChargeDB.hasMany(ContractDB, { foreignKey: "id_charge" });
ContractDB.belongsTo(ChargeDB, { foreignKey: "id_charge" });

DepartamentDB.hasMany(ContractDB, { foreignKey: "id_departament" });
ContractDB.belongsTo(DepartamentDB, { foreignKey: "id_departament" });

EmpleoyeeDB.hasMany(ContractDB, { foreignKey: "id_empleoyee" });
ContractDB.belongsTo(EmpleoyeeDB, { foreignKey: "id_empleoyee" });

//Relaciones tabla Asistencias
ContractDB.hasMany(EmpleoyeeAssistanceDB, { foreignKey: "id_contract" });
EmpleoyeeAssistanceDB.belongsTo(ContractDB, { foreignKey: "id_contract" });

//Relaciones tabla Supervisor
ContractDB.hasMany(SupervisorDB, { foreignKey: "id_contrato" });
SupervisorDB.belongsTo(ContractDB, { foreignKey: "id_contrato" });

//Relaciones tabla Evaluacion de desempeño
EmpleoyeeDB.hasMany(PerformanceEvaluationDB, { foreignKey: "id_empleoyee" });
PerformanceEvaluationDB.belongsTo(EmpleoyeeDB, { foreignKey: "id_empleoyee" });

SupervisorDB.hasMany(PerformanceEvaluationDB, { foreignKey: "id_supervisor" });
PerformanceEvaluationDB.belongsTo(SupervisorDB, { foreignKey: "id_supervisor" });

//Relaciones tabla Nomina
ContractDB.hasMany(PaysheetDB, { foreignKey: "id_contract" });
PaysheetDB.belongsTo(ContractDB, { foreignKey: "id_contract" });

//Relaciones tabla Detalle Nomina
PaysheetDB.hasMany(PaysheetDetailDB, { foreignKey: "id_paysheet" });
PaysheetDetailDB.belongsTo(PaysheetDB, { foreignKey: "id_paysheet" });

ConceptDB.hasMany(PaysheetDetailDB, { foreignKey: "id_concept" });
PaysheetDetailDB.belongsTo(ConceptDB, { foreignKey: "id_concept" });

// Sincroniza los modelos con la base de datos
const syncModels = async () => {
  await db.sync({ alter: true });
  try {
  } catch (error) {
    console.error(error);
  }
};

syncModels();

export {
  ChargeDB,
  ConceptDB,
  ContractDB,
  DepartamentDB,
  EmpleoyeeAssistanceDB,
  EmpleoyeeDB,
  EmpleoyeeUserDB,
  PaysheetDB,
  PaysheetDetailDB,
  PerformanceEvaluationDB,
  SupervisorDB,
  db,
};

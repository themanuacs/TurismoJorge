import { DataTypes } from "sequelize";

const ContractModel = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  date: {
    type: DataTypes.DATE,
    allowNull:false,
  },
  salary: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  state: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  hours: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  days: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  id_empleoyee: {
    type: DataTypes.INTEGER,
  },
  id_charge: {
    type: DataTypes.INTEGER,
  },
  
  id_departament: {
    type: DataTypes.INTEGER,
  },
};

export { ContractModel };

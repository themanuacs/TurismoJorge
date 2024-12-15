import { DataTypes } from "sequelize";

const EmpleoyeeAssistanceModel = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  entry: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  exit: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  id_contract: {
    type: DataTypes.INTEGER,
  },
  
};

export { EmpleoyeeAssistanceModel };

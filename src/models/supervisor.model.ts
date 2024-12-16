import { DataTypes } from "sequelize";

const SupervisorModel = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  id_contrato: {
    type: DataTypes.INTEGER,
  },
};

export { SupervisorModel };

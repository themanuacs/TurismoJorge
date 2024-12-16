import { DataTypes } from "sequelize";

const PerformanceEvaluationModel = {
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
  qualification: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  comments: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  id_empleoyee: {
    type: DataTypes.INTEGER,
  },
  id_supervisor: {
    type: DataTypes.INTEGER,
  },
};

export { PerformanceEvaluationModel };

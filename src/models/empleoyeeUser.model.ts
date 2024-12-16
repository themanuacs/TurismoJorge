import { DataTypes } from "sequelize";

const EmpleoyeeUserModel = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull:false,
  },
  password: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  id_empleoyee: {
    type: DataTypes.INTEGER,
  },
};

export { EmpleoyeeUserModel };

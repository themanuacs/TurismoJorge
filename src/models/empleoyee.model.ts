import { DataTypes } from "sequelize";

const EmpleoyeeModel = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  Tshirt_size: {
    type: DataTypes.INTEGER,
  },
  Pants_size: {
    type: DataTypes.INTEGER,
  },
  Shoes_size: {
    type: DataTypes.INTEGER,
  },
};

export { EmpleoyeeModel };

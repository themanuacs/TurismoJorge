import { DataTypes } from "sequelize";

const ProductModel = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  deletedAt: {
    type: DataTypes.DATE,
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
};

export { ProductModel };

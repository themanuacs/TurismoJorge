import { DataTypes } from "sequelize";

const PaysheetDetailModel = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  id_paysheet: {
    type: DataTypes.INTEGER,
  },
  id_concept: {
    type: DataTypes.INTEGER,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
};

export { PaysheetDetailModel };

import { DataTypes } from "sequelize";

const ConceptModel = {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  formule: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
};

export { ConceptModel };

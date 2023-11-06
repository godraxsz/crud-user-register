import { DataTypes, Model } from "sequelize";
import db from "../database/connection.js";

class User extends Model {}

User.init(
  {
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: db,
    paranoid: true,
    timestamps: true,
    tableName: 'users',
  }
);

export default User;

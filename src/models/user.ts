import { DataTypes } from "sequelize";
import db from "../database/connection.js";

const User = db.define('User', {
    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    phone: {
        type: DataTypes.STRING
    },
}, {
    paranoid: true, // Habilita a exclusão lógica com o campo deletedAt
    timestamps: true, // Inclui createdAt e updatedAt
    tableName: 'users', // Substitua pelo nome da sua tabela, se necessário
});

export default User;
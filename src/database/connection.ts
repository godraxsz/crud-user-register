import { Sequelize, Dialect } from 'sequelize';
import * as dotenv from 'dotenv';

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

const dbName = process.env.DB_NAME || 'crud-user-register'; // Nome do Banco de Dados
const dbUser = process.env.DB_USER || 'root'; // Usuário do Banco de dados
const dbPassword = process.env.DB_PASSWORD || 'password'; // Senha do Banco de dados
const dbHost = process.env.DB_HOST || 'localhost'; // Endereço do Host
const dbDialect = process.env.DB_DIALECT as Dialect || 'mysql'; // Dialeto para o Sequelize
const dbTimezone = process.env.DB_TIMEZONE || '-03:00' // Timezone São Paulo, Brasil

const db = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: dbDialect,
    timezone: dbTimezone,
    logging: false, // Desativar logs no console
});

export default db;

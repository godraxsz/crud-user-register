import express, { Application } from 'express';
import cors from 'cors';
import usersRoutes from '../routes/users.js';
import db from '../database/connection.js';

class Server {

    private app: Application;
    private port: string;
    private apiPaths = {
        users: '/api/users'
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';

        // Banco de dados
        this.databaseConnection();

        // Middlewares
        this.middlewares();

        // Definir rotas
        this.routes();

    }

    async databaseConnection() {

        try {

            await db.authenticate();
            console.log('Database Online');

        } catch (error: any) {
            throw new Error(error);
        }

    }

    middlewares() {

        // Cors (Cross Origin)
        this.app.use(cors());

        // Leitura do body
        this.app.use(express.json());

        // Pasta Pública
        this.app.use(express.static('public'));

    }

    routes() {

        // Rotas de usuários
        this.app.use(this.apiPaths.users, usersRoutes)

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Listening on port ' + this.port);
        });
    }

}

export default Server;
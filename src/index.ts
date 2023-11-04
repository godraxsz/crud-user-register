import dotenv from 'dotenv';
import Server from './models/server.js';

// Usar configurações .env
dotenv.config();

const server = new Server();

server.listen();
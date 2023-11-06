import { Router } from 'express';
import { getUsers, getUser, postUser, putUser, deleteUser, getUserByDate } from '../controllers/users.js';

const usersRoutes = Router();

usersRoutes.get('/', getUsers);
usersRoutes.get('/:name', getUser);
usersRoutes.get('/date/:dateRange/:name?', getUserByDate);
usersRoutes.post('/', postUser);
usersRoutes.put('/:id', putUser);
usersRoutes.delete('/:id', deleteUser);

export default usersRoutes;
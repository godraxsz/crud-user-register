import { Router } from 'express';
import { getUsers, getUser, postUser, putUser, deleteUser } from '../controllers/users.js';

const usersRoutes = Router();

usersRoutes.get('/', getUsers);
usersRoutes.get('/:id', getUser);
usersRoutes.post('/', postUser);
usersRoutes.put('/:id', putUser);
usersRoutes.delete('/:id', deleteUser);

export default usersRoutes;

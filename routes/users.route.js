import express from 'express';
import { createUser, deleteUser, getAllUsers, getUserById, loginUser, updateUser } from '../controllers/user.controller.js';
const routerUser = express.Router();

routerUser.post('/', createUser);
routerUser.get('/', getAllUsers);
routerUser.get('/:id', getUserById);
routerUser.put('/:id', updateUser);
routerUser.delete('/:id', deleteUser);
routerUser.post('/login', loginUser);

export default routerUser;


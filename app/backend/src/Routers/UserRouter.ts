import { Router } from 'express';
import UserController from '../controller/UserController';

const userRouter = Router();
const userController = new UserController();

userRouter.post('/', (req, res) => userController.authenticateUser(req, res));

export default userRouter;

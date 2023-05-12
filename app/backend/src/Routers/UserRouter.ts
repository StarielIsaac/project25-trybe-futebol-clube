import { Router } from 'express';
import validateLogin from '../middleware/validateLogin';
import UserController from '../controller/UserController';

const userRouter = Router();
const userController = new UserController();

userRouter.post('/', validateLogin, (req, res) => userController.authenticateUser(req, res));

export default userRouter;

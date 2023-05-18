import { Router } from 'express';
import validateLogin from '../middleware/validateLogin';
import UserController from '../controller/UserController';
import validateToken from '../middleware/validateToken';

const userRouter = Router();
const userController = new UserController();

userRouter.post('/', validateLogin, (req, res) => userController.authenticateUser(req, res));
userRouter.get('/role', validateToken, (req, res) => userController.verifyToken(req, res));

export default userRouter;

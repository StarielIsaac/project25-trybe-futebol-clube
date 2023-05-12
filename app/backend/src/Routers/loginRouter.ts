import { Router } from 'express';
import LoginController from '../controller/LoginController';

const loginRouter = Router();
const loginController = new LoginController();

loginRouter.post('/', (req, res) => loginController.authenticateUser(req, res));

export default loginRouter;

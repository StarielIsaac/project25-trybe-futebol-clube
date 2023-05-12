import { Router } from 'express';
import errorHandler from '../middleware/ErrorHandle';
import teamRouter from './teamRouter';
import loginRouter from './loginRouter';

const router = Router();

// rota para o endpoint /teams
router.use('/teams', teamRouter);
// rota para o endpoint /login
router.use('/login', loginRouter);
// middleware para lidar com erros na requisição
router.use(errorHandler);

export default router;

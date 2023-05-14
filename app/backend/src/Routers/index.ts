import { Router } from 'express';
import teamRouter from './teamRouter';
import userRouter from './userRouter';

const router = Router();

// rota para o endpoint /teams
router.use('/teams', teamRouter);
// rota para o endpoint /login
router.use('/login', userRouter);

export default router;

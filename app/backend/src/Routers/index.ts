import { Router } from 'express';
import teamRouter from './teamRouter';

const router = Router();

// rota para o endpoint /teams
router.use('/teams', teamRouter);

export default router;

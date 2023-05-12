import { Router } from 'express';
// import errorHandler from '../middleware/ErrorHandle';
import teamRouter from './teamRouter';

const router = Router();

// rota para o endpoint /teams
router.use('/teams', teamRouter);

// router.use(errorHandler);

export default router;

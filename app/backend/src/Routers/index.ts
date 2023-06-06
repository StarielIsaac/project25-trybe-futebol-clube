import { Router } from 'express';
import teamRouter from './teamRouter';
import userRouter from './userRouter';
import matchRouter from './matchRouter';
import leaderboardRouter from './leaderboardRouter';

const router = Router();

// rota para o endpoint /name
router.use('/teams', teamRouter);

// rota para o endpoint /login
router.use('/login', userRouter);

// rota para o endpoint /matches
router.use('/matches', matchRouter);

// rota para o endpoint /leaderboard
router.use('/leaderboard', leaderboardRouter);

export default router;

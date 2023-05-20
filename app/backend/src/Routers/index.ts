import { Router } from 'express';
import teamRouter from './teamRouter';
import userRouter from './userRouter';
import matchRouter from './matchRouter';
import leaderboard from './leaderboardRouter';

const router = Router();

// rota para o endpoint /teams
router.use('/teams', teamRouter);

// rota para o endpoint /login
router.use('/login', userRouter);

// rota para o endpoint /matches
router.use('/matches', matchRouter);

// rota para o endpoint /leaderboard/home
router.use('/leaderboard/home', leaderboard);

export default router;

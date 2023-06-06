import { Router } from 'express';
import LeaderboardController from '../controller/LeaderboardController';

const leaderboardRouter = Router();
const leaderboardController = new LeaderboardController();

leaderboardRouter.get('/home', (req, res) => leaderboardController.findLeaderBoard(req, res));

leaderboardRouter.get('/away', (req, res) => leaderboardController.visitorPerformance(req, res));

// leaderboardRouter.get('/', (req, res) => leaderboardController.getTeamsPerformance(req, res));

export default leaderboardRouter;

import { Router } from 'express';
import LeaderboardController from '../controller/LeaderboardController';

const leaderboardRouter = Router();
const leaderboardController = new LeaderboardController();

leaderboardRouter.get('/', (req, res) => leaderboardController.findLeaderBoard(req, res));

export default leaderboardRouter;

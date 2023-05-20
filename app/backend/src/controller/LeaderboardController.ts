import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  constructor(private leaderboardService = new LeaderboardService()) {}

  async findLeaderBoard(req: Request, res: Response) {
    const finded = await this.leaderboardService.findLeaderBoard();
    res.status(200).json(finded);
  }
}

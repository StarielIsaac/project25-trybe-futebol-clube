import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  constructor(private leaderboardService = new LeaderboardService()) {}

  async findLeaderBoard(req: Request, res: Response) {
    const sucess = await this.leaderboardService.findLeaderBoard();
    res.status(200).json(sucess);
  }

  // async getTeamsPerformance(_req: Request, res: Response) {
  //   const values = await this.leaderboardService.getTeamsPerformance();
  //   res.status(200).json(values);
  // }

  // getAllAwayTeamsPerformance
  async visitorPerformance(_req: Request, res: Response) {
    const sucess = await this.leaderboardService.visitorPerformance();
    res.status(200).json(sucess);
  }
}

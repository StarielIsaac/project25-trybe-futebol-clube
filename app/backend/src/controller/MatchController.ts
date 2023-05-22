import { Request, Response } from 'express';
import MatchService from '../services/MatchService';
import updateInfo from '../types/updateInfo';
import typeNewMatch from '../types/typeNewMatch';

export default class MatchController {
  constructor(private matchService = new MatchService()) {}

  async findAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    const allMatches = await this.matchService.findAllMatches(inProgress as string | undefined);
    return res.status(200).json(allMatches);
  }

  async matchFinish(req: Request, res: Response) {
    const { id } = req.params;
    const match = await this.matchService.matchFinish(Number(id));
    return res.status(200).json(match);
  }

  async updateOnGoingMatches(req: Request, res: Response) {
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const { id } = req.params;
    const match = await this.matchService
      .updateOnGoingMatches({ id: Number(id), homeTeamGoals, awayTeamGoals } as updateInfo);
    return res.status(200).json(match);
  }

  async createNewMatch(req: Request, res: Response) {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;
    const match = await this.matchService
      .createNewMatch({ homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } as typeNewMatch);
    return res.status(201).json(match);
  }
}

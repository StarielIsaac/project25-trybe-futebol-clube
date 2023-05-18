import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

export default class matchController {
  constructor(private matchService = new MatchService()) {}

  async findAllMatches(req: Request, res: Response) {
    // const findedTeams = await this.matchService.findAllMatches();
    // res.status(200).json(findedTeams);
  }
}

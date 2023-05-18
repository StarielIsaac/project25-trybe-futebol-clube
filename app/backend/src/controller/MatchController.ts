import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

export default class MatchController {
  constructor(private matchService = new MatchService()) {}

  async findAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    const allMatches = await this.matchService.findAllMatches(inProgress as string | undefined);
    res.status(200).json(allMatches);
  }
}

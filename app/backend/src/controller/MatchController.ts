import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

export default class MatchController {
  constructor(private matchService = new MatchService()) {}

  async findAllMatches(req: Request, res: Response) {
    const allMatches = await this.matchService.findAllMatches();
    res.status(200).json(allMatches);
  }
}

import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

export default class TeamController {
  constructor(private teamService = new TeamService()) {}

  async findAllTimes(req: Request, res: Response) {
    const finded = await this.teamService.findAllTimes();
    res.status(200).json(finded);
  }
}

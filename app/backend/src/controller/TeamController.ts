import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

export default class TeamController {
  constructor(private teamService = new TeamService()) {}

  async findAllTimes(req: Request, res: Response) {
    const findedTeams = await this.teamService.findAllTimes();
    res.status(200).json(findedTeams);
  }

  async findById(req: Request, res: Response) {
    const { id } = req.params;
    const findedTeam = await this.teamService.findById(Number(id));
    res.status(200).json(findedTeam);
  }
}

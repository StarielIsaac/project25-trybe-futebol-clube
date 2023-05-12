import TeamModel from '../model/TeamModel';

export default class TeamService {
  constructor(private teamModel = new TeamModel()) {}

  async findAllTimes() {
    const findedTeams = await this.teamModel.findAllTimes();
    return findedTeams;
  }

  async findById(id:number) {
    const findedTeam = await this.teamModel.findById(id);
    return findedTeam;
  }
}

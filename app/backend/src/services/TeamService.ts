import TeamModel from '../model/TeamModel';

export default class TeamService {
  constructor(private teamModel = new TeamModel()) {}

  async findAllTimes() {
    const findedTeams = await this.teamModel.findAllTimes();
    return findedTeams;
  }
}

import TeamModel from '../model/TeamModel';

export default class TeamService {
  constructor(private teamModel = new TeamModel()) {}

  async findAllTimes() {
    const finded = await this.teamModel.findAllTimes();
    return finded;
  }
}

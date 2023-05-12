import Team from '../database/models/Teams';

class TeamModel {
  constructor(private team = Team) {}

  async findAllTimes() {
    const findedTeams = await this.team.findAll();
    return findedTeams;
  }
}

export default TeamModel;

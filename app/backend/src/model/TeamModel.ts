import Team from '../database/models/Teams';

class TeamModel {
  constructor(private team = Team) {}

  async findAllTimes() {
    const findedTeams = await this.team.findAll();
    return findedTeams;
  }

  async findById(id: number) {
    const findedTeam = await this.team.findByPk(id);
    return findedTeam;
  }
}

export default TeamModel;

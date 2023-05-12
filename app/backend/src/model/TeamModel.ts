import Team from '../database/models/Teams';

class TeamModel {
  constructor(private team = Team) {}

  async findAllTimes() {
    const finded = await this.team.findAll();
    return finded;
  }
}

export default TeamModel;

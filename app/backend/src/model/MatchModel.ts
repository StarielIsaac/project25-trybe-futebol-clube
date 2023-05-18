import Team from '../database/models/Match';

class MatchModel {
  constructor(private team = Team) {}

  async findAllMatches() {
    // const findedTeams = await this.team.findAll();
    // return findedTeams;
  }
}

export default MatchModel;

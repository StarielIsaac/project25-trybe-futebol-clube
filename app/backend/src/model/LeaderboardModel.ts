import Team from '../database/models/Teams';

class LeaderboardModel {
  constructor(private team = Team) {}

  async findLeaderBoard() {
    const finded = await this.team.findAll();
    return finded;
  }
}

export default LeaderboardModel;

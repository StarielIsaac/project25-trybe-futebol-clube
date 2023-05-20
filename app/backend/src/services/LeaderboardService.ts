import LeaderboardModel from '../model/LeaderboardModel';

export default class LeaderboardService {
  constructor(private leaderboardModel = new LeaderboardModel()) {}

  async findLeaderBoard() {
    const finded = await this.leaderboardModel.findLeaderBoard();
    return finded;
  }
}

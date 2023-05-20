import MatchModel from '../model/MatchModel';
import updateInfo from '../types/updateInfo';

export default class MatchService {
  constructor(private matchModel = new MatchModel()) {}

  async findAllMatches(inProgress: string | undefined) {
    if (inProgress !== undefined) {
      const progress = inProgress === 'true';
      const inProgressMatches = await this.matchModel.getMatchesNoScope(progress);
      return inProgressMatches;
    }

    const allMatches = await this.matchModel.findAllMatches();
    return allMatches;
  }

  async matchFinish(id: number) {
    const match = await this.matchModel.matchFinish(id);
    return match;
  }

  async updateOnGoingMatches({ id, homeTeamGoals, awayTeamGoals }: updateInfo) {
    const match = await this.matchModel.updateOnGoingMatches({ id, homeTeamGoals, awayTeamGoals });
    return match;
  }
}

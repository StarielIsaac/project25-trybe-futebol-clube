import MatchModel from '../model/MatchModel';
import updateInfo from '../types/updateInfo';
import typeNewMatch from '../types/typeNewMatch';
import ErrorLaunch from '../utils/errorLaunch';

export default class MatchService {
  constructor(private matchModel = new MatchModel()) {}

  static validateTeamsAndExistence(homeTeamId: number, awayTeamId: number) {
    if (homeTeamId === awayTeamId) {
      throw new ErrorLaunch('It is not possible to create a match with two equal teams', 422);
    }
  }

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

  async createNewMatch({ homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals }: typeNewMatch) {
    const isValid = MatchService.validateTeamsAndExistence(homeTeamId, awayTeamId);

    const match = await this.matchModel.createNewMatch(
      { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } as typeNewMatch,
    );

    return match;
  }
}

import MatchModel from '../model/MatchModel';

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
}

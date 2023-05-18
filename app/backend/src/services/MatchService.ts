import MatchModel from '../model/MatchModel';

export default class MatchService {
  constructor(private matchModel = new MatchModel()) {}

  async findAllMatches() {
    const allMatches = await this.matchModel.findAllMatches();
    return allMatches;
  }
}

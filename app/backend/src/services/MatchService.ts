import MatchModel from '../model/MatchModel';

export default class MatchService {
  constructor(private matchModel = new MatchModel()) {}

  async findAllMatches() {
    // const findedTeams = await this.matchModel.findAllMatches();
    // return findedTeams;
  }
}

import Match from '../database/models/Match';
import Teams from '../database/models/Teams';

class MatchModel {
  constructor(private match = Match) {}

  async findAllMatches() {
    const allMatches = await this.match.findAll({
      include: [
        {
          model: Teams,
          as: 'homeTeam',
          attributes: ['teamName'],
        },
        {
          model: Teams,
          as: 'awayTeam',
          attributes: ['teamName'],
        },

      ],
    });
    return allMatches;
  }

  async getMatchesNoScope(progress: boolean) {
    const matches = await this.match.findAll({
      include: [
        {
          model: Teams,
          as: 'homeTeam',
          attributes: ['teamName'],
        },
        {
          model: Teams,
          as: 'awayTeam',
          attributes: ['teamName'],
        },

      ],
      where: {
        inProgress: progress,
      },
    });
    return matches;
  }
}

export default MatchModel;

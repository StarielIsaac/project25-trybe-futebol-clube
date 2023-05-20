import updateInfo from '../types/updateInfo';
import Match from '../database/models/Match';
import Teams from '../database/models/Teams';
import typeNewMatch from '../types/typeNewMatch';

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

  async matchFinish(id: number) {
    const matchUpdated = await this.match.update(
      { inProgress: false },
      { where: { id } },
    );
    return matchUpdated;
  }

  async updateOnGoingMatches({ id, homeTeamGoals, awayTeamGoals }: updateInfo) {
    const match = await this.match.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );
    return match;
  }

  async createNewMatch({ ...newMatch }: typeNewMatch) {
    const match = await this.match.create({
      ...newMatch,
      inProgress: true,
    });
    return match;
  }
}

export default MatchModel;

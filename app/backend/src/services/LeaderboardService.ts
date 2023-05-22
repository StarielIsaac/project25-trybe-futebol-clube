import { matche, teamAndId, infoTeam } from '../types/LeaderBoard';
import MatchModel from '../model/MatchModel';

export default class LeaderboardService {
  constructor(private matchModel = new MatchModel()) {}

  async filterAllTeams() {
    // Obtendo todas as partidas
    const allMatches = await this.matchModel.getMatchesNoScope(false) as unknown as matche[];

    // Iterando sobre cada partida para encontrar as equipes únicas
    const teamNameAndId: teamAndId[] = [];
    allMatches.forEach(({ homeTeam, homeTeamId }) => {
      // Verificando se a equipe já foi adicionada
      const isTeamAdded = teamNameAndId.some(({ name }) => name === homeTeam.teamName);
      if (!isTeamAdded) {
        // Adicionando a equipe à lista
        teamNameAndId.push({
          name: homeTeam.teamName,
          id: homeTeamId,
        });
      }
    });

    return { allMatches, teamNameAndId };
  }

  static calculateStatistics(matchesPerTeam: matche[]) {
    // Somando os gols a favor das equipes
    const goalsFavor = matchesPerTeam.reduce((total, match) => total + match.homeTeamGoals, 0);
    // Somando os gols contra das equipes
    const goalsOwn = matchesPerTeam.reduce((total, match) => total + match.awayTeamGoals, 0);
    // Contando o número total de vitórias das equipes
    const totalVictories = matchesPerTeam.filter((match) =>
      match.homeTeamGoals > match.awayTeamGoals).length;
    // Contando o número total de empates das equipes
    const totalDraws = matchesPerTeam.filter((match) =>
      match.homeTeamGoals === match.awayTeamGoals).length;
    // Contando o número total de derrotas das equipes
    const totalLosses = matchesPerTeam.filter((match) =>
      match.homeTeamGoals < match.awayTeamGoals).length;

    return {
      totalVictories,
      goalsFavor,
      totalLosses,
      goalsOwn,
      totalDraws,
    };
  }

  static calculatePerformance(matchesPerTeam: matche[], teamInfo: infoTeam) {
    // Calculando o total de pontos da equipe (vitórias * 3 + empates)
    const totalPoints = (teamInfo.totalVictories * 3) + teamInfo.totalDraws;
    // Calculando o saldo de gols da equipe (gols a favor - gols contra)
    const goalsBalance = teamInfo.goalsFavor - teamInfo.goalsOwn;
    // Calculando a eficiência da equipe em porcentagem
    const efficiency = Number(((totalPoints / (matchesPerTeam.length * 3)) * 100).toFixed(2));

    return {
      goalsBalance,
      efficiency,
      totalPoints,
    };
  }

  async getLeaderBoard() {
    const { allMatches, teamNameAndId } = await this.filterAllTeams();

    // Calculando o desempenho de cada equipe
    const performanceTeams = teamNameAndId.map(({ name, id }) => {
      // Filtrando as partidas da equipe atual
      const matchesPerTeam = allMatches.filter(({ homeTeamId }) => homeTeamId === id);
      // Calculando as estatísticas da equipe
      const teamInfo = LeaderboardService.calculateStatistics(matchesPerTeam);

      return {
        name,
        totalGames: matchesPerTeam.length,
        ...teamInfo,
        ...LeaderboardService.calculatePerformance(matchesPerTeam, teamInfo),
      };
    });

    return performanceTeams;
  }

  async findLeaderBoard() {
    // obtem a tabela de classificação completa
    const performanceTeams = await this.getLeaderBoard();

    const sortedLeaderBoard = performanceTeams.sort((a, b) => {
      if (a.totalPoints !== b.totalPoints) return b.totalPoints - a.totalPoints;
      if (a.totalVictories !== b.totalVictories) return b.totalVictories - a.totalVictories;
      if (a.goalsBalance !== b.goalsBalance) return b.goalsBalance - a.goalsBalance;
      if (a.goalsFavor !== b.goalsFavor) return b.goalsFavor - a.goalsFavor;
      return 0;
    });

    return sortedLeaderBoard;
  }
}

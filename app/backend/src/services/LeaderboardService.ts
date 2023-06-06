import {
  matche,
  teamAndId,
  infoTeam,
  TeamPerformance,
  MatchData,
  TeamType,
} from '../types/LeaderBoard';
import MatchModel from '../model/MatchModel';
import TeamModel from '../model/TeamModel';

export default class LeaderboardService {
  constructor(
    private matchModel = new MatchModel(),
    private teamModel = new TeamModel(),
    private performance: TeamPerformance = {
      name: '',
      totalPoints: 0,
      totalGames: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 0,
      goalsOwn: 0,
      goalsBalance: 0,
      efficiency: 0,
    },
  ) {}

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

  async visitorPerformance() {
    const allMatches = await this.matchModel.getMatchesNoScope(false);
    const allTeams = await this.teamModel.findAllTimes();

    const allAwayTeamsPerformance = this.setTeamsPerformance(allMatches, allTeams, false);

    return LeaderboardService.orderTeamsByPerformance(allAwayTeamsPerformance);
  }

  setNotConditionalPerformanceData(team: TeamType, matchesPerTeam: MatchData[]) {
    const { teamName } = team;
    const totalGames = matchesPerTeam.length;
    const goalsBalance = this.performance.goalsFavor - this.performance.goalsOwn;
    const efficiency = Number(((this.performance.totalPoints / (totalGames * 3)) * 100).toFixed(2));

    Object.assign(this.performance, { name: teamName, totalGames, goalsBalance, efficiency });
  }

  calculateTeamPerformance(team: TeamType, matchesPerTeam: MatchData[], isHomeTeam: boolean) {
    this.calculateGoals(matchesPerTeam, isHomeTeam);
    this.calculateResults(matchesPerTeam, isHomeTeam);
    this.setNotConditionalPerformanceData(team, matchesPerTeam);

    return this.performance;
  }

  calculateGoals(matchesPerTeam: MatchData[], isHomeTeam: boolean) {
    matchesPerTeam.forEach(({ homeTeamGoals, awayTeamGoals }) => {
      this.performance.goalsFavor += isHomeTeam ? homeTeamGoals : awayTeamGoals;
      this.performance.goalsOwn += isHomeTeam ? awayTeamGoals : homeTeamGoals;
    });
  }

  calculateResults(matchesPerTeam: MatchData[], isHomeTeam: boolean) {
    matchesPerTeam.forEach((match) => {
      const { homeTeamGoals, awayTeamGoals } = match;
      if (
        (isHomeTeam && homeTeamGoals > awayTeamGoals)
        || (!isHomeTeam && awayTeamGoals > homeTeamGoals)) {
        this.performance.totalVictories += 1;
        this.performance.totalPoints += 3;
      } else if (
        (isHomeTeam && homeTeamGoals < awayTeamGoals)
        || (!isHomeTeam && awayTeamGoals < homeTeamGoals)) {
        this.performance.totalLosses += 1;
      } else {
        this.performance.totalDraws += 1;
        this.performance.totalPoints += 1;
      }
    });
  }

  resetAtributePerformance() {
    this.performance = {
      name: '',
      totalPoints: 0,
      totalGames: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 0,
      goalsOwn: 0,
      goalsBalance: 0,
      efficiency: 0,
    };
  }

  static orderTeamsByPerformance(teamsPerformance: TeamPerformance[]) {
    return teamsPerformance.sort((a, b) => {
      if (b.totalPoints !== a.totalPoints) {
        return b.totalPoints - a.totalPoints;
      }
      if (b.totalVictories !== a.totalVictories) {
        return b.totalVictories - a.totalVictories;
      }
      if (b.goalsBalance !== a.goalsBalance) {
        return b.goalsBalance - a.goalsBalance;
      }
      return b.goalsFavor - a.goalsFavor;
    });
  }

  setTeamsPerformance(allMatches: MatchData[], allTeams: TeamType[], homeTeam: boolean) {
    return allTeams.map((team) => {
      const matchesPerTeam = allMatches.filter(({ homeTeamId, awayTeamId }) =>
        (homeTeam ? homeTeamId : awayTeamId) === team.id);
      const performance = this.calculateTeamPerformance(team, matchesPerTeam, homeTeam);
      this.resetAtributePerformance();
      return performance;
    });
  }
}

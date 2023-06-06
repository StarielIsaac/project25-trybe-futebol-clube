type team = {
  teamName: string;
};

export type matche = {
  id: number;
  homeTeamId: number;
  awayTeamId: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
  inProgress: boolean;
  homeTeam: team;
  awayTeam: team;
};

export type teamAndId = {
  name: string,
  id: number
};

export type infoTeam = {
  goalsFavor: number,
  goalsOwn: number,
  totalVictories: number,
  totalDraws: number,
};

export type TeamPerformance = {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: number,
};

export type MatchData = {
  id?: number,
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
  inProgress: boolean,
};

export type TeamType = {
  id?: number,
  teamName: string,
};

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

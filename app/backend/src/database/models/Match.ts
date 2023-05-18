import { Model, DataTypes } from 'sequelize';
import db from '.';
import Teams from './Teams';

class Match extends Model {
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

Match.init({
  homeTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  awayTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  underscored: true,
  tableName: 'matches',
  timestamps: false,
  sequelize: db,
});

Teams.hasMany(Match, { foreignKey: 'awayTeamId', as: 'awayTeam' });
Teams.hasMany(Match, { foreignKey: 'homeTeamId', as: 'homeTeam' });
Match.belongsTo(Teams, { foreignKey: 'awayTeamId', as: 'awayTeam' });
Match.belongsTo(Teams, { foreignKey: 'homeTeamId', as: 'homeTeam' });

export default Match;

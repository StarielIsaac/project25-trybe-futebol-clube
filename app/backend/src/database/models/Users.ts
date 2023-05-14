import { Model, DataTypes } from 'sequelize';
import db from '.';

class User extends Model {
  // declare id: number;
  declare username: string;
  declare role: string;
  declare password: string;
  declare email: string;
}

User.init({
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  underscored: true,
  timestamps: false,
  modelName: 'users',
});

export default User;

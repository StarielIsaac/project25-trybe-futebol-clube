import { Model, DataTypes } from 'sequelize';
import db from '.';

class Teams extends Model {
  declare teamName: string;
}

Teams.init(
  {
    teamName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Opções para configuração da tabela 'teams'
    underscored: true, // Define se as colunas terão nomes com underscore
    sequelize: db, // Conexão com o banco de dados
    timestamps: false, // Define se a tabela terá campos para created_at e updated_at
    tableName: 'teams', // Nome da tabela no banco de dados
  },
);

export default Teams;

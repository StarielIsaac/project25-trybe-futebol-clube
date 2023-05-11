module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Função para migrar o esquema do banco de dados para cima, criando a tabela 'teams'
    await queryInterface.createTable('teams', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      team_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('teams');
  },
};
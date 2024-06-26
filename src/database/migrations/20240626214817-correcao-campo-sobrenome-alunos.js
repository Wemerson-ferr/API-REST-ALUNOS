/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn('alunos', 'Sobrenome', 'sobrenome');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn('alunos', 'sobrenome', 'Sobrenome');
  },
};

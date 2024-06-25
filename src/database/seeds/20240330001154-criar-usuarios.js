const bcryptjs = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          nome: 'John Doe',
          email: 'QUUrC@example.com',
          password_hash: await bcryptjs.hash('pZhPnAkmrx', 9),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          nome: 'Jane Doe',
          email: 'QJZyF@example.com',
          password_hash: await bcryptjs.hash('bxidpi', 9),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          nome: 'Junior Doe',
          email: 'QkEJn@example.com',
          password_hash: await bcryptjs.hash('nBZDMkGYBV', 9),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    );
  },

  async down() {},
};

'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'users',
      'imagem', {
        type: Sequelize.STRING
      },
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      'users', 
      'imagem'
    );
  }
};

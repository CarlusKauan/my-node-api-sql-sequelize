'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'pets',
      'imagem', {
        type: Sequelize.STRING
      },
    );
    await queryInterface.addColumn(
      'pets',
      'descricao', {
        type: Sequelize.STRING
      },
    );
    await queryInterface.addColumn(
      'pets',
      'uf', {
        type: Sequelize.STRING
      },
    );
    await queryInterface.addColumn(
      'pets',
      'sexo', {
        type: Sequelize.STRING
      },
    );
    await queryInterface.addColumn(
      'pets',
      'porte', {
        type: Sequelize.STRING
      },
    );
    await queryInterface.addColumn(
      'pets',
      'situacao', {
        type: Sequelize.STRING
      },
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      'pets', 
      'imagem'
    );
    await queryInterface.removeColumn(
      'pets', 
      'descricao'
    );
    await queryInterface.removeColumn(
      'pets', 
      'uf'
    );
    await queryInterface.removeColumn(
      'pets', 
      'sexo'
    );
    await queryInterface.removeColumn(
      'pets', 
      'porte'
    );
    await queryInterface.removeColumn(
      'pets', 
      'situacao'
    );
  }
};
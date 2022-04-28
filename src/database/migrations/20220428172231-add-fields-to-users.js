'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'users',
      'senha', {
        type: Sequelize.STRING
      },
    );
    await queryInterface.addColumn(
      'users',
      'telefone', {
        type: Sequelize.STRING
      },
    );
    await queryInterface.addColumn(
      'users',
      'descricao', {
        type: Sequelize.STRING
      },
    );
    await queryInterface.addColumn(
      'users',
      'data_nascimento', {
        type: Sequelize.STRING
      },
    );
    await queryInterface.addColumn(
      'users',
      'rede_social', {
        type: Sequelize.STRING
      },
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      'users', 
      'senha'
    );
    await queryInterface.removeColumn(
      'users', 
      'telefone'
    );
    await queryInterface.removeColumn(
      'users', 
      'descricao'
    );
    await queryInterface.removeColumn(
      'users', 
      'dataNascimento'
    );
    await queryInterface.removeColumn(
      'users', 
      'rede_social'
    );
  }
};
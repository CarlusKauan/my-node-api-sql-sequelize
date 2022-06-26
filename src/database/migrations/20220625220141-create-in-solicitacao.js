'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

      await queryInterface.createTable('solicitacao', {
        id: {
          type:Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          alloNull: false
        },
        user_solicita: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'users', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        name_solicita: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        telefone_solicita: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        imagem_solicita: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        pets_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'pets', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        name_pet: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        aprovado: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'users', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        name_dono: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        telefone_dono: {
          type: Sequelize.STRING,
          allowNull: false,
        },

      });

  },

  async down (queryInterface, Sequelize) {

    await queryInterface.dropTable('solicitacao');

  }
};

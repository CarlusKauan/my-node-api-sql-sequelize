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
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'users', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        pets_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'pets', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        Aprovado: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },


      });

  },

  async down (queryInterface, Sequelize) {

    await queryInterface.dropTable('solicitacao');

  }
};

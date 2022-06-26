const { Model, DataTypes } = require('sequelize')

class Solicitacao extends Model{
  static init(sequelize) {
    super.init({
      aprovado: DataTypes.BOOLEAN,
      name_solicita: DataTypes.STRING,
      telefone_solicita: DataTypes.STRING,
      imagem_solicita: DataTypes.STRING,
      name_pet: DataTypes.STRING,
      name_dono: DataTypes.STRING,
      telefone_dono: DataTypes.STRING


    }, {
      sequelize,
      tableName: 'solicitacao'

    })
  }

    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'user_id', as: 'owner' })
      this.belongsTo(models.User, { foreignKey: 'user_solicita', as: 'solicita' });
      this.belongsTo(models.Pet, { foreignKey: 'pets_id', as: 'solicitado'});


  }


};


module.exports = Solicitacao;

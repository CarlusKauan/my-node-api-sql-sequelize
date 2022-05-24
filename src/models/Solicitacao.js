const { Model, DataTypes } = require('sequelize')

class Solicitacao extends Model{
  static init(sequelize) {
    super.init({
      Aprovado: DataTypes.BOOLEAN
    }, {
      sequelize
    })
  }

    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'user_id', as: 'owner' })
      this.belongsTo(models.Pet, { foreignKey: 'pets_id ', as: 'solicitado' })
  }


};


module.exports = Solicitacao;

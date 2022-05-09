const { Model, DataTypes } = require('sequelize')

class Pet extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            age: DataTypes.INTEGER,
            breed: DataTypes.STRING,
            imagem: DataTypes.STRING,
            descricao: DataTypes.STRING,
            uf: DataTypes.STRING,
            sexo: DataTypes.STRING,
            porte: DataTypes.STRING,
            situacao: DataTypes.STRING
        }, {
            sequelize
        })
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'owner' })
    }

};

module.exports = Pet;

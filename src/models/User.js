const { Model, DataTypes } = require('sequelize')

class User extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            imagem: DataTypes.STRING,
            email: DataTypes.STRING,
            senha: DataTypes.STRING,
            telefone: DataTypes.STRING,
            descricao: DataTypes.STRING,
            data_nascimento: DataTypes.STRING,
            rede_social: DataTypes.STRING
        }, {
            sequelize
        })
    }

    static associate(models) {
        this.hasMany(models.Pet, { foreignKey: 'user_id', as: 'pets' });
        this.belongsToMany(models.Category, { foreignKey: 'user_id', through: 'user_categories', as: 'categories'});
    }
};

module.exports = User;

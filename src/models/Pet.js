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
            cidade: DataTypes.STRING,
            situacao: DataTypes.STRING,

        }, {
            sequelize
        })
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'owner' })
        // this.hasMany(models.Solicitacao, { foreignKey: 'pets_id', as: 'solicitado' })
        this.hasMany(models.Solicitacao, { foreignKey: 'pets_id', as: 'solicitado' })
    }

};

module.exports = Pet;



// fullName: {
//   type: DataTypes.VIRTUAL,
//   get() {
//     return `${this.name} ${this.uf}`;
//   },
//   set(value) {
//     throw new Error('Do not try to set the `fullName` value!');
//   }
// }

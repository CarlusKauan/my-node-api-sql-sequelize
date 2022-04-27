const { Model, DataTypes } = require('sequelize')

class Category extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
        }, {
            sequelize,
            tableName: 'categories'
        })
    }

    static associate(models) {
        this.belongsToMany(models.User, { foreignKey: 'category_id', through: 'user_categories', as: 'users'})
    }
};

module.exports = Category;
const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

// Imports Models
const Pet = require('../models/Pet');
const User = require('../models/User');
const Category = require('../models/Category');
const Solicitacao = require('../models/Solicitacao');


const connection = new Sequelize(dbConfig);

User.init(connection);
Pet.init(connection);
Category.init(connection);
Solicitacao.init(connection);


User.associate(connection.models);
Pet.associate(connection.models);
Category.associate(connection.models);
Solicitacao.associate(connection.models);
// Tests.associate(connection.models);

module.exports = connection;



const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

// Imports Models
const Pet = require('../models/Pet');
const User = require('../models/User');

const connection = new Sequelize(dbConfig);

User.init(connection);
Pet.init(connection);

User.associate(connection.models);
Pet.associate(connection.models);

module.exports = connection;



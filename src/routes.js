const express = require('express')
const UserController = require('./controllers/UserController');
const PetController  = require('./controllers/PetController');
const CategoryController  = require('./controllers/CategoryController');
const { verifyJwt } = require('./controllers/UserController');
const { username } = require('./config/database');

const routes = express.Router()

routes.post('/users', UserController.store)
routes.get('/users',verifyJwt ,UserController.index);

routes.get('/users/pets', PetController.index);
routes.get('/users/:user_id/pets', PetController.show);
routes.post('/users/:user_id/pets', PetController.store);

routes.get('/users/:user_id/categories', CategoryController.index);
routes.post('/users/:user_id/categories', CategoryController.store);
routes.delete('/users/:user_id/categories', CategoryController.delete);
routes.post('/login',UserController.login);



module.exports = routes;

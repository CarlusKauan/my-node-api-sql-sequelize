const express = require('express')
const UserController = require('./controllers/UserController');
const PetController  = require('./controllers/PetController');
const CategoryController  = require('./controllers/CategoryController');

const routes = express.Router()
 
routes.post('/users', UserController.store);
routes.get('/users', UserController.index);

routes.get('/users/:user_id/pets', PetController.index);
routes.post('/users/:user_id/pets', PetController.store);

routes.get('/users/:user_id/categories', CategoryController.index);
routes.post('/users/:user_id/categories', CategoryController.store);
routes.delete('/users/:user_id/categories', CategoryController.delete);

module.exports = routes;
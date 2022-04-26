const express = require('express')
const UserController = require('./controllers/UserController');
const PetController  = require('./controllers/PetController');

const routes = express.Router()
 
routes.post('/users', UserController.store);
routes.get('/users', UserController.index);

routes.get('/users/:user_id/pets', PetController.index);
routes.post('/users/:user_id/pets', PetController.store);

module.exports = routes;
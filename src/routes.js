const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');

const UserController = require('./controllers/UserController');
const PetController  = require('./controllers/PetController');
const CategoryController  = require('./controllers/CategoryController');

const routes = express.Router()
const upload = multer(uploadConfig);

routes.post('/users', UserController.store);
routes.get('/users', UserController.index);

routes.get('/users/pets', PetController.index);
routes.get('/users/:user_id/pets', PetController.show);
routes.post('/users/:user_id/pets', upload.single('imagem'), PetController.store);

routes.get('/users/:user_id/categories', CategoryController.index);
routes.post('/users/:user_id/categories', CategoryController.store);
routes.delete('/users/:user_id/categories', CategoryController.delete);
routes.post('/login',UserController.login);



module.exports = routes;

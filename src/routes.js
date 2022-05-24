const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');

const UserController = require('./controllers/UserController');
const PetController  = require('./controllers/PetController');
const CategoryController  = require('./controllers/CategoryController');
const SolicitacaoController  = require('./controllers/SolicitacaoController');
const { verifyJwt } = require('./controllers/UserController');
const { username } = require('./config/database');

const routes = express.Router()
const upload = multer(uploadConfig);
// const maxFotos = 3;

routes.post('/users', upload.single('imagem'), UserController.store) //criando user
// routes.get('/users',verifyJwt ,UserController.index); // COM AUTENTICAÇÃO
routes.get('/users',UserController.index); //buscar todos os users

routes.get('/users/pets', PetController.index); //buscar todos os pets
routes.get('/users/:user_id/pets', PetController.show); // busca o pet do user
routes.post('/users/:user_id/pets', upload.single('imagem'), PetController.store); //criando pet
// routes.post('/users/:user_id/pets', upload.array('imagem', maxFotos), PetController.store);
// routes.delete('/users/:user_id/pets', PetController.destroy);

routes.get('/users/:user_id/categories', CategoryController.index);
routes.post('/users/:user_id/categories', CategoryController.store);
routes.delete('/users/:user_id/categories',verifyJwt, CategoryController.delete);
routes.post('/login',UserController.login);


//Rotas de solicitacao

routes.post('/pets/:pets_id/solicitacoes', SolicitacaoController.store); //criando pet

///pets/:pets_id/solicitacoes

module.exports = routes;

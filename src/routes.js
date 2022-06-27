const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');

const UserController = require('./controllers/UserController');
const PetController  = require('./controllers/PetController');
const CategoryController  = require('./controllers/CategoryController');
const SolicitacaoController  = require('./controllers/SolicitacaoController');
const AprovadoController  = require('./controllers/AprovadoController');
const ReprovadoController  = require('./controllers/ReprovadoController');


const { verifyJwt } = require('./controllers/UserController');
const { username } = require('./config/database');
const { Router } = require('express');

const routes = express.Router()
const upload = multer(uploadConfig);
// const maxFotos = 4;


//Controller de User
// routes.get('/user/:name',UserController.UserGetName)
routes.get('/usuario/:id',UserController.show)
routes.get('/busca/:email', UserController.UserGet)
routes.post('/users', upload.single('imagem' ), UserController.store)
// routes.get('/users',verifyJwt ,UserController.index); // COM AUTENTICAÇÃO
routes.get('/users', UserController.index); //buscar todos os users

routes.delete('/users/:id', UserController.destroy);

routes.patch('/users/:id', UserController.RememberPass);


//Controller de Pet
routes.get('/users/pets', PetController.index); //buscar todos os pets
routes.get('/users/:user_id/pets', PetController.show); // busca o pet do user
routes.post('/users/:user_id/pets', upload.single('imagem'), PetController.store); //criando pet
// routes.post('/users/:user_id/pets', upload.array('imagem', maxFotos), PetController.store);
routes.delete('/pets/:id', PetController.destroy);





//Controller de Categoria
routes.get('/users/:user_id/categories', CategoryController.index);
routes.post('/users/:user_id/categories', CategoryController.store);
routes.delete('/users/:user_id/categories',verifyJwt, CategoryController.delete);
routes.post('/login',UserController.login);


//Controller de Solicitações
routes.post('/pets/:pets_id/solicitacao', upload.single('imagem_solicita'), SolicitacaoController.store);
routes.get('/solicitacao/:id', SolicitacaoController.showSoli); // nou
routes.get('/solici/:user_id', SolicitacaoController.indexSoli);//nou
routes.get('/users/:user_solicita/solicitacao', SolicitacaoController.showUser); // solicitacao que o usuario tem
routes.get('/pets/:pets_id/solicitacao', SolicitacaoController.showPet); // solicitação que o pet tem
routes.delete('/solicitacao/:id', SolicitacaoController.destroy);



//Controllers de aprovado e reprovado
routes.post('/solicitacao/:solicitacao_id/aprovados', AprovadoController.store);
routes.post('/solicitacao/:solicitacao_id/reprovados', ReprovadoController.store);

//
routes.get('/Adotados/pets', AprovadoController.GetAdotados);



routes.get('/portes1/pets', PetController.GetPorte1);
routes.get('/portes2/pets', PetController.GetPorte2);
routes.get('/portes3/pets', PetController.GetPorte3);


//Update
// rota de pets que foram aprovados e passando a situacao para adotados
routes.put('/pets/:id', AprovadoController.updateSituacao);

routes.put('/users/:id', UserController.updateUser);
routes.put('/pets/:id', PetController.updatePet);


module.exports = routes;


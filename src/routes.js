const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');

const UserController = require('./controllers/UserController');
const PetController  = require('./controllers/PetController');
const CategoryController  = require('./controllers/CategoryController');
const SolicitacaoController  = require('./controllers/SolicitacaoController');
const AprovadoController  = require('./controllers/AprovadoController');
const ReprovadoController  = require('./controllers/ReprovadoController');
const BuscaController  = require('./controllers/BuscaController');


const { verifyJwt } = require('./controllers/UserController');
const { username } = require('./config/database');

const routes = express.Router()
const upload = multer(uploadConfig);
// const maxFotos = 3;


//Controller de User
routes.get('/busca/:email', UserController.UserGet)
// routes.post('/users', UserController.store) //criando user
routes.post('/users', upload.single('imagem'), UserController.store)
// routes.get('/users',verifyJwt ,UserController.index); // COM AUTENTICAÇÃO
routes.get('/users', UserController.index); //buscar todos os users


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
routes.get('/user/:id',UserController.show)




//rotas de updateUser
// routes.put('/users/:id', UserController.updateUser);




//rotas de updatePet
// routes.patch('/pets/:id', PetController.updatePet);






//Controller de Solicitações
routes.post('/pets/:pets_id/solicitacao', SolicitacaoController.store);
routes.get('/solicitacao/:id', SolicitacaoController.showSoli);
routes.get('/solicitacao', SolicitacaoController.indexSoli);
routes.get('/users/:user_solicita/solicitacao', SolicitacaoController.showUser);
routes.get('/pets/:pets_id/solicitacao', SolicitacaoController.showPet);
routes.delete('/solicitacao/:id', SolicitacaoController.destroy);

//Controllers de aprovado e reprovado
routes.post('/solicitacao/:solicitacao_id/aprovados', AprovadoController.store);
routes.post('/solicitacao/:solicitacao_id/reprovados', ReprovadoController.store);

//
routes.get('/Adotados/pets', AprovadoController.GetAdotados);


//Controlller de Busca
routes.get('/portes1/pets', BuscaController.GetPorte1);
routes.get('/portes2/pets', BuscaController.GetPorte2);
routes.get('/portes3/pets', BuscaController.GetPorte3);
module.exports = routes;


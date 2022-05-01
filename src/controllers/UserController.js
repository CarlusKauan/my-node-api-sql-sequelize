const User = require("../models/User");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const dbConfig = require('../config/database');

// const dbconection =  new Sequelize(dbConfig);


const SECRET = 'CARLOS123'
const app = require('express');
const { use } = require("../routes");

module.exports = {
  async store(req, res) {

    const hashedPassword = await bcrypt.hash(req.body.senha, 10)

    const userExists = await User.findOne({
      where: {
        name: req.body.name,
      }
    })
    const emailExists = await User.findOne({
      where: {
        email: req.body.email,
      }
    })

    if (userExists) {
      return res.status(409).json({
        error: "Esse Nome já existe, tente outro"
      })
    } else if (emailExists) {
      return res.status(409).json({
        error: "Email já existe, tente outro"
      })
    }

    const {
      name,
      email,
      senha,
      telefone,
      descricao,
      data_nascimento,
      rede_social,
    } = req.body;

    const user = await User.create({
      name,
      email,
      senha: hashedPassword,
      telefone,
      descricao,
      data_nascimento,
      rede_social,
    });

    return res.json(user);
  },

  async index(req, res) {
    const users = await User.findAll();
    return res.json(users);
  },



  async login(req, res){

    const username = await User.findOne({
      attributes : ['email', 'senha'],
      where: {
        email: req.body.email
      }
    });

    if(username == null){
      return res.status(400).json('Nenhum usuário encontrado');
    }


    if(req.body.email === username.email && await bcrypt.compare(req.body.senha, username.senha)){
     const token = jwt.sign({name : 'Carlus'}, SECRET, {expiresIn : 500});
      return res.json({auth: true, token});
    }
    return res.status(400).json('UserName e senha inválidos');
  },

  async show(req, res) {
    const {
      id
    } = req.params;
    const user = await User.findByPk(id)
    return res.json(user)
  }
};








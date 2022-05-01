const User = require("../models/User");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');


const SECRET = 'CARLOS123'
const app = require('express');

module.exports = {
  async store(req, res) {

    const hashedPassword = await bcrypt.hash(req.body.senha, 10)

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
    if(req.body.name === 'Carlos' && req.body.senha === '123456'){
     const token = jwt.sign({name : 'Carlus'}, SECRET, {expiresIn : 500});
      return res.json({auth: true, token});
    }

    return res.status(400).json('UserName e senha inválidos');
  }
};






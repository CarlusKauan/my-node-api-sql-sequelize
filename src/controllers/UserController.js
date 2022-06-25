const User = require("../models/User");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const dbConfig = require('../config/database');

// const dbconection =  new Sequelize(dbConfig);
const SECRET = 'AMOPATAS'
const app = require('express');
const { use } = require("../routes");
const { decode } = require("punycode");

module.exports = {
  async store(req, res) {

    // const { filename } = req.file;
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
      //imagem: filename,
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

  async login(req, res) {

    const username = await User.findOne({
      attributes: ['email', 'senha'],
      where: {
        email: req.body.email
      }
    });

    if (username == null) {
      return res.status(400).json('Nenhum usuário encontrado');
    }


    if (req.body.email === username.email && await bcrypt.compare(req.body.senha, username.senha)) {
      const token = jwt.sign({ username }, SECRET, { expiresIn: 500 });
      return res.json({ token: token });
    }
    return res.status(400).json('UserName e senha inválidos');
  },

  async show(req, res) {
    const {
      id
    } = req.params;
    const user = await User.findByPk(id)

    if(!user){
      res.status(401).json({ message: "Nenhum usuario encontrado" })
    }
    return res.json(user)
  },

  verifyJwt(req, res, next) {
    const token = req.headers['x-access-token'];// pega na inserção do token e coloca na variavel (token-jwt é pego no headers)
    jwt.verify(token, SECRET, (err, decoded) => {
      if (err)
        return res.status(401).json('Necessário login e senha ლ(╹◡╹ლ)');
      req.username = decoded.username; // token sera guardado pelo username do usuario <3
      next(); // middieware de excução do proximo method
    })

  },

  //funciona por meio de json
  async updateUser(req, res) {

      const { id } = req.params
<<<<<<< HEAD
      const { senha } = req.body
=======
      const { name,
        email,
        //imagem: filename,
        telefone,
        descricao,
        data_nascimento,
        rede_social,
      } = req.body
>>>>>>> b7a7cfe611aedee7942c07a4a33b5f409c565f93

      const user = await User.findOne({ where: { id } })

      if (!user) {
        res.status(401).json({ message: "Nenhum usuario encontrado" })
      } else {
        const user = await User.update({
<<<<<<< HEAD
          senha
=======
          name,
          email,
          //imagem: filename,
          telefone,
          descricao,
          data_nascimento,
          rede_social,
>>>>>>> b7a7cfe611aedee7942c07a4a33b5f409c565f93
        }, { where: { id } })
        // console.log(user + "teste");
        res.status(200).json({ user })
      }
  },

  //ainda não funciona
  // async updateImagem(req, res){
  //   const { filename } = req.file;
  //   const { id } = req.params

  //   const user = await User.findOne({ where: { id } })

  //   if (!user) {
  //     res.status(401).json({ message: "Nenhum usuario encontrado" })
  //   } else {
  //     const user = await User.update({
  //       imagem: filename }, { where: { id } })

  //     res.status(200).json({ user })
  //     // console.log(user + "teste2222");
  //   }
  // },
  async UserGet(req, res){
    const {email} = req.params;
    const user = await User.findOne({where: {email}})

    if(!user){
      res.status(400).json({ message: "Nenhum usuario encontrado" })
    }

    return res.json(user);
<<<<<<< HEAD
  },

  async UserGetName(req, res){
    const {name} = req.params;
    const user = await User.findOne({where: {name}})

    if(!user){
      res.status(400).json({ message: "Nenhum usuario encontrado" })
    }

    return res.json(user);
  },

  async destroy(req, res) {
    const { id } = req.params;
    await User.destroy({
      where: { id }

    });

    return res.status(200).send({ message: 'Conta excluida com sucesso' })
  },


  async RememberPass(res, req){
    const { id } = req.params;
    const { senha } = req.body;
    const user = await User.findOne({where: {id}});
    const hashedPassword = await bcrypt.hash(senha, 10)

    if(!user){
      res.status(400).json({ message: "Nenhum usuario encontrado" })
    }
    else{
      const user = await User.update(User).where({id : id})
      
      return res.json(`senha alterada com sucesso ${user.senha}!!!!`);
    }   
  }


=======
  }
>>>>>>> b7a7cfe611aedee7942c07a4a33b5f409c565f93
};

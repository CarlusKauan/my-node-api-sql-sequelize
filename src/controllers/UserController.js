const User = require("../models/User");
const bcrypt = require('bcrypt')


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

  async show(req, res) {
    const {
      id
    } = req.params;
    const user = await User.findByPk(id)
    return res.json(user)
  }
};
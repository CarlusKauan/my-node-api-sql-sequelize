const User = require("../models/User");
const bcrypt = require('bcrypt')


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
};

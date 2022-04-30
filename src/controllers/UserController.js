const User = require("../models/User");

module.exports = {
  async store(req, res) {
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
      senha,
      telefone,
      descricao,
      data_nascimento,
      rede_social,
    });

    this.encript(senha); // chamando metodo de criptografia e inseirindo a Prop senha
    return res.json(user);
  },

  async index(req, res) {
    const users = await User.findAll();
    return res.json(users);
  },

  //TODO METODO DE CRIPTOGRAFIA 
  encript(password) {
    const bcrypt = require("bcrypt");
    const pass = password

    for (let saltRounds = 10; saltRounds <= 15; saltRounds++) {
      bcrypt.hash(pass, saltRounds).then((passHashed) => {
        console.log(passHashed);
      });
    }
  },



  //TESTE AINDA
 async Authenticate(user, senha){
     const {nome} = user.body;
     const pass = await User.findAll(nome = user)

     const match = await bcrypt.compare(pass, senha)

     if(match){
        console.log("Permitido")
     }
     else{
         console.log("Acesso negago")
     }
 }

};

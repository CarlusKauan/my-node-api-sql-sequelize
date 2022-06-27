const Pet = require('../models/Pet');
const Solicitacao = require('../models/Solicitacao');
const User = require('../models/User');


module.exports = {


  async store(req, res) {
    // const { filename } = req.file;
    const { user_solicita, user_id} = req.headers;
    const { aprovado } = req.params;
    const { pets_id } = req.params;
    const { name_solicita,telefone_solicita,name_pet,name_dono,
      telefone_dono, /*imagem_solicita*/ } = req.body;
//,imagem_solicita


    console.log("pets_id", pets_id)
    console.log("user_solicita", user_solicita)
    console.log("aprovado", aprovado)
    console.log("name_solicita", name_solicita)
    console.log("name_dono", name_dono)
    console.log("name_pet", name_pet)
    console.log("telefone_solicita", telefone_solicita)
    // console.log("filename", filename)



    const Recebersolicitacao = await Solicitacao.create({
      pets_id,
      user_solicita,
      user_id,
      name_solicita,
      telefone_solicita,
      // imagem_solicita: filename,
      aprovado : false,
      name_pet,
      name_dono,
      telefone_dono,
    });

    return res.json(Recebersolicitacao);
  },



  //listar todas as solicitações
  async indexSoli(req, res) {
    const {user_id} = req.params;
    const solicitacoes = await Solicitacao.findAll({where:{user_id},
      include: { association: 'solicitado' }
    });


    if (!solicitacoes) {
      res.status(400).json({ error: 'Solicitation not found' });
    }

    return res.status(200).json(solicitacoes);
  },


  //buscar solicitação por id


  async showSoli(req, res) {
    const { id } = req.params;


    console.log("id", id)

    const solicitacao = await Solicitacao.findByPk(id,
      { include: { association: 'owner' },

    },
    );


    console.log("id", id)

    // console.log("solicitado", solicitado)

    if (!solicitacao) {
      res.status(400).json({ error: 'Solicitation not found' });
      // return res.status(200).json(solicitacao.include);
    }

    // return res.status(200).json(solicitacao.pets);


    return res.status(200).json(solicitacao);
  },

  // Exibir o usuario que fez a solicitação
    async showUser(req, res) {
      const { user_solicita } = req.params;

      console.log("user_solicita", user_solicita)

      const user = await User.findByPk(user_solicita, {
        include: { association: 'solicita' }
      });

      return res.json(user);
    },

    // Exibir o pet que foi solicitado e as solicitações
     async showPet(req, res) {
      const { pets_id } = req.params;

      console.log("pets_id", pets_id)

      const pet = await Pet.findByPk(pets_id, {
        include: { association: 'solicitado' },

      });

      return res.json(pet);
    },

    async destroy(req, res) {
      const { id } = req.params;
      await Solicitacao.destroy({
        where: { id }

      });

      return res.status(200).send({ message: 'Solicitação Cancelada' });
    },

};

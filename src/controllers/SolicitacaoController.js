

const Pet = require('../models/Pet');
const Solicitacao = require('../models/Solicitacao');
const User = require('../models/User');
// const { store } = require('./PetController');

module.exports = {

  async store(req, res) {
    const { user_solicita, user_id } =  req.body;
    const { aprovado } = req.params;
    const { pets_id } = req.params;

    console.log("pets_id", pets_id)
    console.log("user_solicita", user_solicita)
    console.log("aprovado", aprovado)


    const solicitacao = await Solicitacao.create({
      pets_id,
      user_solicita,
      user_id,
      aprovado : false

    });

    return res.json(solicitacao);
  },



  //listar todas as solicitações
  async indexSoli(req, res) {
    const {user_id} = req.params;
    const solicitacoes = await Solicitacao.findAll({where:{user_id}});

    if (!solicitacoes) {
      res.status(400).json({ error: 'Solicitation not found' });
    }

    return res.status(200).json(solicitacoes);
  },


  //buscar solicitação por id
  async showSoli(req, res) {
    const { id } = req.params;

    console.log("id", id)

    const solicitacao = await Solicitacao.findByPk(id,{
      include: { association: 'solicitado' },


    });

    if (!solicitacao) {
      res.status(400).json({ error: 'Solicitation not found' });
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
        include: { association: 'solicitado' }
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

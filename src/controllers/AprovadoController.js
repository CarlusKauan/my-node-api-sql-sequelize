const Solicitacao = require('../models/Solicitacao');
const Pet = require('../models/Pet');

module.exports = {
    async store(req, res){
      const{solicitacao_id} = req.params;


      const solicitacao = await Solicitacao.findByPk(solicitacao_id,{
        include: { association: 'solicitado'}
      });
      solicitacao.aprovado = true

      await solicitacao.save();

      return res.json(solicitacao);
    },

    async GetAdotados(req, res){
      const petAdotado = await Pet.findAll({
          where : {situacao : 'Adotado'}
      });
      return res.json(petAdotado);
    },


    // situacao 'Adotado' no body
    async updateSituacao(req, res) {

      const { id } = req.params;
      const { situacao } = req.body;

      const pet = await Pet.findOne({
        where: {id}
      })


      if (!pet) {
        res.status(401).json({
          message: "Nenhum pet encontrado"
        })
      } else {
        const pet = await Pet.update({
          situacao
        }, {
          where: { id }

        })
        // console.log(user + "teste");
        res.status(200).json({ pet})

      }
    },




};

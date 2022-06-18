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


};

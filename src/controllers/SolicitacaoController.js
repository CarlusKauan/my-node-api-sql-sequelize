const Solicitacao = require('../models/Solicitacao');

module.exports = {
  async store(req, res) {
    const { user_id } = req.body;
    const { pets_id } = req.params;

    const solicitacao = await Solicitacao.create({
      user: user_id,
      pet: pets_id,

    });

    return res.json(solicitacao);
  }

};

const Pet = require('../models/Pet');


module.exports = {

  async GetPorte1(req, res){
    const portePet1 = await Pet.findAll({
        where : {porte : 'pequeno'}


    });

    return res.json(portePet1);

  },

  async GetPorte2(req, res){
    const portePet2 = await Pet.findAll({
        where : {porte : 'medio'}


    });

    return res.json(portePet2);

  },

  async GetPorte3(req, res){
    const portePet3 = await Pet.findAll({
        where : {porte : 'grande'}


    });

    return res.json(portePet3);

  },



};

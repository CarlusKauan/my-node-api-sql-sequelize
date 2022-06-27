const { update } = require('../models/Pet');
const Pet = require('../models/Pet');
const User = require('../models/User');
const AprovadoController = require('./AprovadoController');

// WHERE = situacao: 'Disponível Adoção' está funcionando

module.exports = {

  async show(req, res) {
    const {
      user_id
    } = req.params;

    const user = await User.findByPk(user_id, {
      // where: {
      //   situacao: 'Disponível Adoção'
      // },
      include: {
        association: 'pets'
      }
    });

    return res.json(user.pets) //-> caso queira retornar so os dados dos pets !
    // return res.json(user);
  },

  async index(req, res) {
    const pets = await Pet.findAll({
      // where: {
      //   situacao: 'Disponível Adoção'
      // }
    });

    if (!pets) {
      res.status(400).json({
        error: 'User not found'
      });
    }

    return res.status(200).json(pets)
  },




  async store(req, res) {

    const { filename } = req.file;
    const { user_id } = req.params;
    const { name, age, breed, descricao, uf, sexo, porte, cidade} = req.body;
    const { situacao } = req.params;


    const user = await User.findByPk(user_id)

    if (!user) {
      return res.status(400).json({
        error: 'usuario não existe ＞﹏＜'
      })
    }

    const pet = await Pet.create({

      name,
      age,
      breed,
      user_id,
      imagem: filename,
      descricao,
      cidade,
      uf,
      sexo,
      porte,
      situacao : 'Disponível para Adoção'
    });

    return res.json(pet);
  },

  async destroy(req, res) {
    const {
      id
    } = req.params;
    await Pet.destroy({
      where: {
        id
      }

    });

    return res.status(200).send({
      message: 'Pet excluído com sucesso'
    })
  },

  async updatePet(req, res) {

    const {
      id
    } = req.params
    const {
      name,
      age,
      breed,
      // user_id,
      // imagem: filename,
      descricao,
      uf,
      sexo,
      porte,
      situacao
    } = req.body

    const pet = await Pet.findOne({
      where: {
        id
      }
    })

    if (!pet) {
      res.status(401).json({
        message: "Nenhum pet encontrado"
      })
    } else {
      const pet = await Pet.update({
        name,
        age,
        breed,
        // user_id,
        // imagem: filename,
        descricao,
        uf,
        sexo,
        porte,
        situacao
      }, {
        where: {
          id
        }
      })
      // console.log(user + "teste");
      res.status(200).json({
        pet
      })
    }
  },

  async GetPorte1(req, res) {
    const portePet1 = await Pet.findAll({
      where: {
        porte: 'pequeno'
      }
    });

    return res.json(portePet1);
  },

  async GetPorte2(req, res) {
    const portePet2 = await Pet.findAll({
      where: {
        porte: 'medio'
      }
    });

    return res.json(portePet2);
  },

  async GetPorte3(req, res) {
    const portePet3 = await Pet.findAll({
      where: {
        porte: 'grande'
      }
    });

    return res.json(portePet3);
  },

}

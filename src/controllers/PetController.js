const Pet = require('../models/Pet');
const User = require('../models/User');

module.exports = {

    async show(req, res) {
        const { user_id } = req.params;

        const user = await User.findByPk( user_id, {
            include: { association: 'pets' }
        });

        // return res.json(user.pets) -> caso queira retornar so os dados dos pets !
        return res.json(user);
    },

    async index(req, res) {
        const pets = await Pet.findAll()

        if(!pets) {
            res.status(400).json({ error: 'User not found' });
        }

        return res.status(200).json(pets)
    },

    async store(req, res) {
        const { user_id } = req.params;
        const { name, age, breed, imagem, descricao, uf, sexo, porte, situacao  } = req.body;

        const user = await User.findByPk(user_id)

        if(!user){
            return res.status(400).json({ error: 'usuario não existe ＞﹏＜' })
        }

        const pet = await Pet.create({
            name,
            age,
            breed,
            user_id,
            imagem,
            descricao,
            uf,
            sexo,
            porte,
            situacao
        });

        return res.json(pet);
    },

    async delete(req, res){

    },
}
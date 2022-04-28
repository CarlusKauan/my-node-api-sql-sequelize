const User = require('../models/User')

module.exports = {
    async store(req, res) {
        const {
            name,
            email,
            senha,
            telefone,
            descricao,
            data_nascimento,
            rede_social
        } = req.body;

        const user = await User.create({
            name,
            email,
            senha,
            telefone,
            descricao,
            data_nascimento,
            rede_social
        });

        return res.json(user);
    },

    async index(req, res) {
        const users = await User.findAll()
        return res.json(users);
    },
};
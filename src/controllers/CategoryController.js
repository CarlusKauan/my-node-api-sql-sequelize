const Category = require('../models/Category');
const User = require('../models/User');
const { patch, put } = require('../routes');

module.exports = {
    async index(req, res){
        const { user_id } = req.params;

        const user = await User.findByPk(user_id, {
            include: { association : 'categories' }
        });

        return res.json(user.categories);
    },

    async store(req, res){
        const { user_id } = req.params;
        const { name } = req.body;

        const user = await User.findByPk(user_id);

        if(!user){
            res.status(400).json({ error: 'User not found'})
        }

        const [ category ] = await Category.findOrCreate({
            where: { name }
        });

        await user.addCategory(category);

        return res.json(category);
    },

    async delete(req, res) {
        const { user_id } = req.params;
        const { name } = req.body;

        const user = await User.findByPk(user_id);

        if(!user){
            res.status(400).json({ error: 'User not found'})
        }

        const category = await Category.findOne({
            where : { name }
        });

        await user.removeCategory(category);

        return res.json({ message: 'Remove Category with Success '});
    }
}

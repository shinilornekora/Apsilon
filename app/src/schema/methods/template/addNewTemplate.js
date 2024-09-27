const { Template } = require('../../../models');
const { User } = require('../../../models');
const { HOST } = require('../../../constants')

module.exports = {
    mode: 'post',
    handler: async (req, res) => {
        try {
            const { name, content } = req.body;
            const user = JSON.parse(JSON.stringify(req.user.dataValues));

            const existingUser = await User.findOne({ where: { username: user.username } });

            if (!existingUser) {
                return res.status(400).json({ message: 'User does not exist' });
            }

            const newTemplate = await Template.create({ name, content, username: user.username });

            res.status(201).json({
                _links: {
                    self: `${HOST}/templates/${newTemplate.id}`
                },
                template: {
                    id: newTemplate.id,
                    createdAt: newTemplate.createdAt,
                    updatedAt: newTemplate.updatedAt,
                }
            });
        } catch (error) {
            console.log('Ошибка создания шаблона.', error);
            console.log('Возникла у пользователя: ', JSON.parse(JSON.stringify(req.user.dataValues)));

            res.status(500).json({ message: 'Ошибка при создании шаблона' });
        }
    }
}
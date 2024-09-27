const { Template } = require('../../../models');

module.exports = {
    mode: 'post',
    handler: async (req, res) => {
        try {
            const { name, content } = req.body;
            const newTemplate = await Template.create({ name, content });
            res.status(201).json({
                _links: {
                    self: `${HOST}/templates/${newTemplate.id}`
                },
                template: newTemplate
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ошибка при создании шаблона' });
        }
    }
}
const { Template } = require('../../../models');
const { HOST } = require('../../../constants');

module.exports = {
    mode: 'get',
    handler: async (req, res) =>  {
        try {
            const template = await Template.findByPk(req.params.id);

            if (!template) {
                return res.status(404).json({ message: 'Шаблон не найден' });
            }

            res.json({ 
                _links: { 
                    href: `${HOST}/templates/${template.id}/details`
                },
                template: {
                    id: template.id,
                    createdAt: template.createdAt,
                    updatedAt: template.updatedAt,
                }
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ошибка при получении шаблона' });
        }
    }
}
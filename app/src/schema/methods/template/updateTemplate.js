const { Template } = require('../../../models');
const { HOST } = require('../../../constants');

module.exports = {
    mode: 'put',
    handler: async (req, res) => {
        try {
            const template = await Template.findByPk(req.params.id);

            if (!template) {
                return res.status(404).json({ message: 'Запрос на публикацию не найден' });
            }

            const { name, content } = req.body;
            await template.update({ name, content });

            res.json({
                _links: {
                    href: `${HOST}/publish-requests/${template.id}/details`
                },
                template: {
                    id: template.id,
                    status: template.status
                }
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ошибка при обновлении запроса на публикацию' });
        }
    }
};

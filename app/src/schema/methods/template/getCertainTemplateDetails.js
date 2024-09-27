const { Template } = require('../../../models');

module.exports = {
    mode: 'get',
    handler: async (req, res) =>  {
        try {
            const template = await Template.findByPk(req.params.id);

            if (!template) {
                return res.status(404).json({ message: 'Шаблон не найден' });
            }

            res.status(200).json(template);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ошибка при получении шаблона' });
        }
    }
}
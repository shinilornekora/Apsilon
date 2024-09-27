const { Template } = require('../../../models');

module.exports = {
    mode: 'delete',
    handler: async (req, res) => {
        try {
            const template = await Template.findByPk(req.params.id);
            if (!template) {
                return res.status(404).json({ message: 'Шаблон не найден' });
            }
            await template.destroy();
            res.status(204).end(); // 204 No Content
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ошибка при удалении шаблона' });
        }
    }
}
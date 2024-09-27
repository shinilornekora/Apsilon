const { PublishRequest } = require('../../../models');
const { HOST } = require('../../../constants');

module.exports = {
    mode: 'get',
    handler: async (req, res) => {
        try {
            const publishRequest = await PublishRequest.findByPk(req.params.id);

            if (!publishRequest) {
                return res.status(404).json({ message: 'Запрос на публикацию не найден' });
            }

            res.json(publishRequest);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ошибка при получении деталей запроса на публикацию' });
        }
    }
};

const { PublishRequest } = require('../../../models');
const { HOST } = require('../../../constants');

module.exports = {
    mode: 'put',
    handler: async (req, res) => {
        try {
            const publishRequest = await PublishRequest.findByPk(req.params.id);

            if (!publishRequest) {
                return res.status(404).json({ message: 'Запрос на публикацию не найден' });
            }

            const { status } = req.body;
            await publishRequest.update({ status });

            res.json({
                _links: {
                    href: `${HOST}/publish-requests/${publishRequest.id}/details`
                },
                publishRequest: {
                    id: publishRequest.id,
                    status: publishRequest.status
                }
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Ошибка при обновлении запроса на публикацию' });
        }
    }
};

const { PublishRequest } = require('../../../models');
const { HOST } = require('../../../constants');

module.exports = {
    mode: 'post',
    handler: async (req, res) => {
        try {
            const { status } = req.body;
            const publishRequest = await PublishRequest.create({ status });

            res.status(201).json({
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
            res.status(500).json({ message: 'Ошибка при создании запроса на публикацию' });
        }
    }
};

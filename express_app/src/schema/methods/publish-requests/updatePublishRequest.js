const { PublishRequest } = require('../../../models');
const { HOST, PORT } = require('../../../constants');

module.exports = {
    mode: 'put',
    handler: async (req, res) => {
        try {
            const publishRequest = await PublishRequest.findByPk(req.params.id);

            if (!publishRequest) {
                return res.status(404).json({ message: 'Cannot find any relevant requests.' });
            }

            const { status } = req.body;
            await publishRequest.update({ status });

            res.json({
                _links: {
                    href: `${HOST}:${PORT}/publish_requests/${publishRequest.id}/details`
                },
                publishRequest: {
                    id: publishRequest.id,
                    status: publishRequest.status
                }
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Request failed, no publishing data update' });
        }
    }
};

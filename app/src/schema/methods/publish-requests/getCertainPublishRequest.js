const { PublishRequest } = require('../../../models');
const { HOST } = require('../../../constants');

module.exports = {
    mode: 'get',
    handler: async (req, res) => {
        try {
            const publishRequest = await PublishRequest.findByPk(req.params.id);

            if (!publishRequest) {
                return res.status(404).json({ message: 'Cannot find any relevant requests.' });
            }

            res.json({
                _links: {
                    href: `${HOST}/publish_requests/${publishRequest.id}/details`
                },
                publishRequest: {
                    id: publishRequest.id,
                    status: publishRequest.status
                }
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Request failed, no publishing data' });
        }
    }
};

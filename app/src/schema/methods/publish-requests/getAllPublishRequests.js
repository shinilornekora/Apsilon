const { PublishRequest } = require('../../../models');
const { HOST } = require('../../../constants');

module.exports = {
    mode: 'get',
    handler: async (_, res) => {
        try {
            const publishRequests = await PublishRequest.findAll();

            const formattedRequests = publishRequests.map(request => ({
                _links: {
                    href: `${HOST}/publish_requests/${request.id}`
                },
                publishRequest: {
                    id: request.id,
                    status: request.status
                }
            }));

            res.json({ publishRequests: formattedRequests });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Request failed, no publishing data' });
        }
    }
};

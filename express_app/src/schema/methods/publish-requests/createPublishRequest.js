const { PublishRequest, Template } = require('../../../models');
const { HOST, PORT } = require('../../../constants');

module.exports = {
    mode: 'post',
    handler: async (req, res) => {
        try {
            const { status, templateName } = req.body;
            const user = JSON.parse(JSON.stringify(req.user.dataValues));
            
            const template = await Template.findOne({ where: { name: templateName } });

            if (!template) {
                res.status(404).json({
                    message: 'This template does not exist.'
                });
            }

            const publishRequest = await PublishRequest.create({ 
                status, 
                author: user.username, 
                templateId: template.id 
            });

            res.status(201).json({
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
            res.status(500).json({ message: 'Request failed, no publishing anything.' });
        }
    }
};

const { Template } = require('../../../models');
const { HOST } = require('../../../constants');

module.exports = {
    mode: 'put',
    handler: async (req, res) => {
        try {
            const template = await Template.findByPk(req.params.id);

            if (!template) {
                return res.status(404).json({ message: 'Oops, error occurred, no templates for you!' });
            }

            const { name, content } = req.body;
            await template.update({ name, content });

            res.json({
                _links: {
                    href: `${HOST}/publish-requests/${template.id}/details`
                },
                template: {
                    id: template.id,
                    createdAt: template.createdAt,
                    updatedAt: template.updatedAt,
                }
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Oops, error occurred, no templates for you!' });
        }
    }
};

const { Template } = require('../../../models');
const { HOST, PORT } = require('../../../constants');

module.exports = {
    mode: 'get',
    handler: async (req, res) =>  {
        try {
            const template = await Template.findByPk(req.params.id);

            if (!template) {
                return res.status(404).json({ message: 'Template is somewhere but not there.' });
            }

            res.json({ 
                _links: { 
                    href: `${HOST}:${PORT}/templates/${template.id}/details`
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
}
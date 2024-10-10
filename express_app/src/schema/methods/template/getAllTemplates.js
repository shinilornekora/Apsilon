const { Template } = require('../../../models');
const { HOST, PORT } = require('../../../constants');

module.exports = {
    mode: 'get',
    handler: async (_, res) => {
        try {
            const templates = await Template.findAll();
            const links = templates.map(template => ({ 
                rel: 'self', 
                href: `${HOST}:${PORT}/templates/${template.id}` 
            }));

            res.json({ 
                _links: links, 
                templates: templates.map(template => ({
                    id: template.id,
                    createdAt: template.createdAt,
                    updatedAt: template.updatedAt,
                })) 
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ 
                message: 'Oops, error occurred, no templates for you!' 
            });
        }
    }
}
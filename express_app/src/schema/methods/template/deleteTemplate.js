const { Template } = require('../../../models');

module.exports = {
    mode: 'delete',
    handler: async (req, res) => {
        try {
            const template = await Template.findByPk(req.params.id);
            if (!template) {
                return res.status(404).json({ message: 'Template is not found.' });
            }
            await template.destroy();
            res.status(204).end();
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Template deletion error.' });
        }
    }
}
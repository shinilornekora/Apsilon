const { Template } = require('../../models')

module.exports = {
    mode: 'get',
    handler: async (req, res) => {
        try {
            const templates = await Template.findAll();
            res.json(templates); 
        } catch (error) {
            console.error(error);
            res.status(500).json({ 
                message: 'Oops, error occurred, no templates for you!' 
            });
        }
    }
}
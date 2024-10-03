const { PublishRequest } = require('../../../models');

module.exports = {
    mode: 'delete',
    handler: async (req, res) => {
        try {
            const publishRequest = await PublishRequest.findByPk(req.params.id);

            if (!publishRequest) {
                return res.status(404).json({ message: 'Cannot find any relevant requests.' });
            }

            await publishRequest.destroy();

            res.status(204).send();
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Request failed, no publishing anything' });
        }
    }
};

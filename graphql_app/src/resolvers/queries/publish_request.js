const { PublishRequest } = require('../../models');

async function getPublishRequests() {
    return await PublishRequest.findAll();
}

async function getPublishRequest(_, { id }) {
    return await PublishRequest.findByPk(id);
}

module.exports = {
    getPublishRequests,
    getPublishRequest,
};
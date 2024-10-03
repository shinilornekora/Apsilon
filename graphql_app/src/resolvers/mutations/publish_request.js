const { PublishRequest } = require('../../models');

async function createPublishRequest(_, { status, author, templateId }) {
    return await PublishRequest.create({ 
        status, 
        author, 
        templateId 
    });
}

async function updatePublishRequest(_, { id, status, templateId }) {
    const publishRequest = await PublishRequest.findByPk(id);

    if (!publishRequest) {
        throw new Error('PR was not found, sorry - no updates');
    }

    return await publishRequest.update({ 
        status, 
        templateId,
    });
}

async function deletePublishRequest(_, { id }) {
    const publishRequest = await PublishRequest.findByPk(id);

    if (!publishRequest) {
        throw new Error('PR cannot be found - no deletions');
    }

    await publishRequest.destroy();

    return `PR with id = ${id} was deleted successfully.`;
}

module.exports = {
    createPublishRequest,
    updatePublishRequest,
    deletePublishRequest,
};
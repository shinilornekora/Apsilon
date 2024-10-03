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
        throw new Error('Запрос не был найден, обновлять нечего');
    }

    return await publishRequest.update({ 
        status, 
        templateId,
    });
}

async function deletePublishRequest(_, { id }) {
    const publishRequest = await PublishRequest.findByPk(id);

    if (!publishRequest) {
        throw new Error('Запрос не был найден - удаление не сработало');
    }

    await publishRequest.destroy();

    return `Запрос с айдишником ${id} удален`;
}

module.exports = {
    createPublishRequest,
    updatePublishRequest,
    deletePublishRequest,
};
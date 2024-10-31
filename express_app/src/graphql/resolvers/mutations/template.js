const { Template } = require('../../models');

async function createTemplate(_, { name, author, content }) {
    return await Template.create({ 
        name, 
        author, 
        content 
    });
}

async function updateTemplate(_, { id, name, content }) {
    const template = await Template.findByPk(id);

    if (!template) {
        throw new Error('Template does not exist at all - update was cut down');
    }

    return await template.update({ 
        name, 
        content 
    });
}

async function deleteTemplate(_, { id }) {
    const template = await Template.findByPk(id);

    if (!template) {
        throw new Error('No templates at all :c');
    }

    await template.destroy();

    return `Template with id = ${id} was deleted, yay!`;
}

module.exports = {
    createTemplate,
    updateTemplate,
    deleteTemplate,
}
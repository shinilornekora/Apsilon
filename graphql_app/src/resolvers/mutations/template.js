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
        throw new Error('Такого шаблона не существует - обновление прервано');
    }

    return await template.update({ 
        name, 
        content 
    });
}

async function deleteTemplate(_, { id }) {
    const template = await Template.findByPk(id);

    if (!template) {
        throw new Error('Шаблон не был найден');
    }

    await template.destroy();

    return `Шаблон с айдишником ${id} был удален`;
}

module.exports = {
    createTemplate,
    updateTemplate,
    deleteTemplate,
}
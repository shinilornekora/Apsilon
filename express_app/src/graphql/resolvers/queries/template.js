const { Template } = require('../../models');

async function getTemplates() {
    return await Template.findAll();
}

async function getTemplate(_, { id }) {
    return await Template.findByPk(id);
}

module.exports = {
    getTemplates,
    getTemplate,
};
const { Sequelize } = require('sequelize');
const models = require('./_models');

const sequelize = new Sequelize('template_app', 'postgres', 'shiniasse', {
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
});

const User = sequelize.define('User', models.userModel);
const Template = sequelize.define('Template', models.publishRequestModel);
const PublishRequest = sequelize.define('PublishRequest', models.PublishRequest);

PublishRequest.belongsTo(Template, { foreignKey: 'templateId' });
Template.hasMany(PublishRequest, { foreignKey: 'templateId' });

module.exports = {
    Template,
    PublishRequest,
    User,
    sequelize,
};
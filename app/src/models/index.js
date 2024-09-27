const { Sequelize } = require('sequelize');
const models = require('./_models');

const sequelize = new Sequelize('template_app', 'postgres', 'shiniasse', {
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
});

const User = sequelize.define('users', models.userModel);
const Template = sequelize.define('templates', models.templateModel);
const PublishRequest = sequelize.define('publishes', models.publishRequestModel);

PublishRequest.belongsTo(Template, { foreignKey: 'templateId' });
Template.belongsTo(User, {foreignKey: 'username' });

User.hasMany(PublishRequest, { foreignKey: 'author' });
User.hasMany(Template, { foreignKey: 'author' });

module.exports = {
    Template,
    PublishRequest,
    User,
    sequelize,
};
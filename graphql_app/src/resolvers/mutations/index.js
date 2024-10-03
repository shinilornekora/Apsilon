const TEMPLATE_MT = require('./template');
const PUBLISH_REQUEST_MT = require('./publish_request');
const USER_MT = require('./user');

module.exports = {
    ...USER_MT,
    ...TEMPLATE_MT,
    ...PUBLISH_REQUEST_MT,
};
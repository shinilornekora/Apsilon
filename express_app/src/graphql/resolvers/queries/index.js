const TEMPLATE_Q = require('./template');
const PUBLISH_REQUEST_Q = require('./publish_request');

module.exports = {
    ...TEMPLATE_Q,
    ...PUBLISH_REQUEST_Q,
};
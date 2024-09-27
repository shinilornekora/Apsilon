module.exports = {
    /* MOCK DATA PROVIDER */
    '/seed': require('./methods/seedTestData'),

    /* TEMPLATE HANDLERS */
    '/templates': require('./methods/template/getAllTemplates'),
    '/templates/add': require('./methods/template/addNewTemplate'),
    '/templates/update/:id': require('./methods/template/updateTemplate'),
    '/templates/delete/:id': require('./methods/template/deleteTemplate'),
    '/templates/:id': require('./methods/template/getCertainTemplate'),
    '/templates/:id/details': require('./methods/template/getCertainTemplateDetails'),

    /* PUBLISH REQUESTS HANDLERS */
    '/publish_requests': require('./methods/publish-requests/getAllPublishRequests'),
    '/publish_requests/add': require('./methods/publish-requests/createPublishRequest'),
    '/publish_requests/update/:id': require('./methods/publish-requests/updatePublishRequest'),
    '/publish_requests/delete/:id': require('./methods/publish-requests/deletePublishRequest'),
    '/publish_requests/:id': require('./methods/publish-requests/getCertainPublishRequest'),
    '/publish_requests/:id/details': require('./methods/publish-requests/getPublishRequestDetails'),

    /* AUTH HANDLERS */
    '/login': require('./methods/auth/login'),
    '/register': require('./methods/auth/register'),
};

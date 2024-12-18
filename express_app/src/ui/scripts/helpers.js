export const TEMPLATE_LAYOUT = (id, name, content) => `
    <div class="template" id="tmplt-${id}">
        <div class="name">${name}</div>
        <div class="content">${content}</div>
        <button class="create-request-btn" data-id="${id}">Make PR</button>
    </div>
`;

export const PUBLISH_REQUEST_LAYOUT = (id, name, author, status) => `
    <div class="publish_request" id="pr-${id}">
        <div class="name">${name}</div>
        <div class="author">${author}</div>
        <div class="status">${status}</div>
    </div>
`;

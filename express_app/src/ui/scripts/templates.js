import { TEMPLATE_LAYOUT } from './helpers.js';

const templatesPlace = document.getElementById('templates');

export const fetchTemplates = async () => {
    const response = await fetch('http://localhost:3000/templates', {
        headers: { 'Authorization': `Bearer ${window.token}` },
    });
    const { templates } = await response.json();

    const data = await Promise.all(templates.map(async ({ id }) => {
        const req = await fetch(`http://localhost:3000/templates/${id}/details`, {
            headers: { 'Authorization': `Bearer ${window.token}` },
        });
        const { name, content } = await req.json();

        return name && content ? TEMPLATE_LAYOUT(id, name, content) : '';
    }));

    templatesPlace.innerHTML = data.join('');
};

templatesPlace.addEventListener('click', async (event) => {
    event.preventDefault();

    if (event.target.classList.contains('create-request-btn')) {
        const id = event.target.getAttribute('data-id');
        const data = await fetch(`http://localhost:3000/templates/${id}/details`, {
            headers: { 'Authorization': `Bearer ${window.token}` },
        });

        const { name, content } = await data.json();

        await fetch('http://localhost:3000/publish_requests/add', {
            method: 'POST',
            body: JSON.stringify({
                status: 'waiting',
                templateName: name,
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${window.token}`,
            },
        });

        await fetch('http://localhost:3000/send_to_rabbit', {
            method: 'POST',
            body: JSON.stringify({
                request_type: 'moderation',
                template_content: content,
                template_name: name,
                author: 'test',
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log(`Request created for template ID: ${id}`);
    }
});

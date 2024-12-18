import { PUBLISH_REQUEST_LAYOUT } from './helpers.js';

const PRPlace = document.getElementById('publishRQ');

export const fetchPublishRequests = async () => {
    const response = await fetch('http://localhost:3000/publish_requests', {
        headers: { 'Authorization': `Bearer ${window.token}` },
    });

    const { templates } = await response.json();

    const data = await Promise.all(templates.map(async ({ id }) => {
        const req = await fetch(`http://localhost:3000/publish_requests/${id}/details`, {
            headers: { 'Authorization': `Bearer ${window.token}` },
        });
        const { name, author, status } = await req.json();

        return name && author ? PUBLISH_REQUEST_LAYOUT(id, name, author, status) : '';
    }));

    PRPlace.innerHTML = data.join('');
};

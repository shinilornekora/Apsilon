import { fetchTemplates } from './templates.js';

const regForm = document.getElementById('form-reg');
const loginForm = document.getElementById('form-login');

regForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const { login, password } = Object.fromEntries(new FormData(regForm));
    const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        body: JSON.stringify({ username: login, password, role: 'user' }),
        headers: { 'Content-Type': 'application/json' },
    });
    alert(JSON.stringify(await response.json()));
});

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const { login, password } = Object.fromEntries(new FormData(loginForm));
    const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        body: JSON.stringify({ username: login, password }),
        headers: { 'Content-Type': 'application/json' },
    });
    const { token } = await response.json();
    if (token) {
        window.token = token;
        alert('ok');
        await fetchTemplates();
    } else {
        alert('not ok');
    }
});

import WebSocket from 'ws';
import { updateHtmlNode } from '../helper.js';

export function setupWebSocket() {
    const ws = new WebSocket('ws://localhost:3100', 'custom');

    ws.on('open', () => {
        console.log('[WebSocket] Connected');
    });

    ws.on('message', (data) => {
        const { protocol, message } = JSON.parse(data);
        console.log(`\n[WebSocket] Protocol: ${protocol}, Message: ${message}\n`);

        updateHtmlNode({ message });
    });

    ws.on('close', () => {
        console.log('[WebSocket] Connection closed');
    });

    ws.on('error', (err) => {
        console.error('[WebSocket] Error:', err.message);
    });
}

import { WebSocketServer } from 'ws';

const protocolClients = {
    websocket: new Set(),
};

export function setupWebSocket(server) {
    const wss = new WebSocketServer({ server });

    wss.on('connection', (ws) => {
        protocolClients.websocket.add(ws);

        console.log(`WebSocket client connected`);

        ws.on('close', () => {
            protocolClients.websocket.delete(ws);
            console.log(`WebSocket client disconnected`);
        });
    });

    console.log('WebSocket server initialized');
}

export function sendWebSocket(message) {
    protocolClients.websocket.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ protocol: 'websocket', message }));
        }
    });
    
    console.log('\nSent message via WebSocket:', message, '\n');
}

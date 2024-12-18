import WebSocket from 'ws';
import { Stomp } from '@stomp/stompjs';

const wss = new WebSocket.Server({ port: 8089 });

wss.on('connection', (ws) => {
    console.log('New client connected');

    const stompClient = Stomp.over(ws);

    stompClient.connect('guest', 'guest', () => {
        console.log('STOMP Client connected');

        stompClient.subscribe('/queue/notifier', (message) => {
            console.log('Received message from client:', message.body);
            stompClient.send('/queue/notifier', {}, 'Message received');
        });
    });

    stompClient.onStompError = (frame) => {
        console.error('STOMP Error:', frame.headers['message']);
    };

    stompClient.onDisconnect = () => {
        console.log('STOMP Client disconnected');
    };

    ws.on('error', (error) => {
        console.error('WebSocket Error:', error);
    });

    ws.on('close', () => {
        console.log('WebSocket connection closed');
    });
});

export const sendSTOMP = (message) => {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            const stompClient = Stomp.over(client);
            stompClient.connect('guest', 'guest', () => {
                stompClient.send('/queue/notifier', {}, message);
            });
        }
    });
};

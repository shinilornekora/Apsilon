import { Client } from '@stomp/stompjs';
import { updateHtmlNode } from '../helper.js';

// Инициализация STOMP клиента
export const setupSTOMP = () => {
    const client = new Client({
        brokerURL: 'ws://localhost:3101',
        connectHeaders: {
            acceptVersion: '1.2,1.1,1.0',
            heartBeat: '10000,10000',
            id: 'message'
        },
        onConnect: () => {
            console.log('STOMP connection established');
            client.subscribe('/topic/messages', (message) => {
                console.log('[STOMP]: Received message:', message.body);

                updateHtmlNode({ message: message.body })
            });
        },
        onWebSocketClose: () => {
            console.log('WebSocket closed');
        },
        onStompError: (error) => {
            console.error('STOMP Error:', error);
        },
        debug: (msg) => console.log('[STOMP]: ', msg)
    })

    client.activate();
}

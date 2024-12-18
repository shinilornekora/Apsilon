import { Client as StompClient } from '@stomp/stompjs';

const STOMP_BROKER_URL = 'ws://localhost:8089';  // Порт 8089 для WebSocket
const STOMP_QUEUE = '/queue/notifier';  // Очередь для отправки сообщений

export const setupSTOMP = () => {
    const client = new StompClient({
        brokerURL: STOMP_BROKER_URL,
        connectHeaders: { login: 'guest', passcode: 'guest' },
        debug: (str) => console.log('STOMP:', str),
    });
    
    client.onConnect = () => {
        console.log('[STOMP] Connected');
        client.subscribe(STOMP_QUEUE, (message) => {
            console.log('[STOMP] Received:', message.body);
        });
    
        client.publish({
            destination: STOMP_QUEUE,
            body: 'Hello from client!',
        });
    };
    
    client.onStompError = (frame) => {
        console.error('[STOMP] Error:', frame.headers['message']);
    };
    
    client.onWebSocketError = (error) => {
        console.error('[STOMP] WebSocket Error:', error);
    };
    
    client.onWebSocketClose = (event) => {
        console.log('[STOMP] WebSocket closed:', event);
    };
    
    client.activate();
    
}
import express from 'express';
import { setupWebSocket } from './protocols/websocket.js';
import { startAMQPConsumer } from './consumers/amqpConsumer.js';

const app = express();
const server = app.listen(3100, () => console.log('WebSocket server running on port 3100'));

// Инициализация WebSocket
setupWebSocket(server);

// Запуск RabbitMQ consumer
startAMQPConsumer().catch(err => console.error('AMQP Error:', err));

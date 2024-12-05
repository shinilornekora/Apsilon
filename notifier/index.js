import express from 'express';
import amqp from 'amqplib';
import { WebSocketServer } from 'ws';

const notifier = express();
const server = notifier.listen(3100, () => console.log('WebSocket server running on port 3100'));
const wss = new WebSocketServer({ server });

const AMQP_QUEUE = 'notifierQueue';

const protocolClients = {
    amqp: new Set(),
    mqtt: new Set(),
    stomp: new Set(),
    custom: new Set(),
};

wss.on('connection', (ws, req) => {
    const protocol = req.headers['sec-websocket-protocol'];

    if (!protocolClients[protocol]) {
        ws.close(1003, 'Unsupported protocol');
        return;
    }

    protocolClients[protocol].add(ws);
    console.log(`Client connected using protocol: ${protocol}`);

    ws.on('close', () => {
        protocolClients[protocol].delete(ws);
        console.log(`Client disconnected from protocol: ${protocol}`);
    });
});

function broadcastMessage(protocol, message) {
    if (!protocolClients[protocol]) { 
        return;
    }

    protocolClients[protocol].forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ protocol, message }));
        }
    });
}

async function startAMQP() {
    const connection = await amqp.connect('amqp://guest:guest@localhost');
    const channel = await connection.createChannel();
    await channel.assertQueue(AMQP_QUEUE, { durable: true });

    console.log(`Listening for messages on RabbitMQ queue: ${AMQP_QUEUE}`);

    channel.consume(AMQP_QUEUE, (msg) => {
        if (msg) {
            const message = msg.content.toString();
            console.log(`Received RabbitMQ message: ${message}`);

            // Время спама!
            broadcastMessage('amqp', message);
            broadcastMessage('mqtt', message);
            broadcastMessage('stomp', message);
            broadcastMessage('custom', message);

            channel.ack(msg);
        }
    });
}

startAMQP().catch(err => console.error('AMQP Error:', err));

import rhea from 'rhea';
import { updateHtmlNode } from '../helper.js';


const AMQP_WS_URL = 'ws://localhost:15674/ws';
const AMQP_QUEUE = 'notifierClientAMQPQueue';

export function setupAMQP() {
    const container = rhea.create_container();

    const connection = container.connect({
        url: AMQP_WS_URL,
        username: 'guest',
        password: 'guest',
        reconnect: true,
    });

    connection.on('connection_open', () => {
        console.log('[AMQP] Connected via WebSocket');

        const receiver = connection.open_receiver({ 
            source: AMQP_QUEUE
        });

        receiver.on('message', (context) => {
            const msg = context.message.body;
            console.log('\n[AMQP] Received:', msg.content, '\n');

            const putMsg = Buffer.from(msg.content, 'binary').toString('utf-8');

            updateHtmlNode({ message: putMsg })
        });
    });

    connection.on('connection_error', (err) => {
        console.error('[AMQP] Connection error:', err.message);
    });

    connection.on('connection_close', () => {
        console.log('[AMQP] Connection closed');
    });
}

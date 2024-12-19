import { sendAMQP } from '../protocols/amqp.js';
import { sendMQTT } from '../protocols/mqtt.js';
import { sendSTOMP } from '../protocols/stomp.js';
import { sendWebSocket } from '../protocols/websocket.js';
import { resolveMessage } from './helper.js';

export async function sendMessage(protocol, message) {
    message = resolveMessage(message)

    switch (protocol) {
        case 'amqp':
            await sendAMQP(message);
            break;
        case 'mqtt':
            sendMQTT(message);
            break;
        case 'stomp':
            sendSTOMP(message);
            break;
        case 'websocket':
            sendWebSocket(message);
            break;
        default:
            console.error('Unknown protocol:', protocol);
    }
    console.log('-------------------------------------------------------------')
}

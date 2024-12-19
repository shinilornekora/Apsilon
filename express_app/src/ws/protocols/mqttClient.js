import mqtt from 'mqtt';
import { updateHtmlNode } from '../helper.js';

const MQTT_BROKER = 'mqtt://localhost';

export function setupMQTT() {
    const client = mqtt.connect(MQTT_BROKER);

    client.on('connect', () => {
        console.log('[MQTT] Connected');
        
        client.subscribe('notifier/topic', (err) => {
            if (!err) console.log('[MQTT] Subscribed to topic');
        });
    });

    client.on('message', (_, message) => {
        console.log('\n[MQTT] Received:', message, '\n');
        const putMsg = Buffer.from(message, 'binary').toString('utf-8');

        updateHtmlNode({ message: putMsg })
    });

    client.on('error', (err) => {
        console.error('[MQTT] Error:', err.message);
    });

    client.on('close', () => {
        console.log('[MQTT] Connection closed');
    });
}

import mqtt from 'mqtt';

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
        console.log('[MQTT] Received:', message.toString());
    });

    client.on('error', (err) => {
        console.error('[MQTT] Error:', err.message);
    });

    client.on('close', () => {
        console.log('[MQTT] Connection closed');
    });
}

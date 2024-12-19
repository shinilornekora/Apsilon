import mqtt from 'mqtt';

const MQTT_BROKER = 'mqtt://localhost';
const mqttClient = mqtt.connect(MQTT_BROKER);

mqttClient.on('connect', () => console.log('Connected to MQTT broker'));

export function sendMQTT(message) {
    mqttClient.publish('notifier/topic', message);
    console.log('\nSent message via MQTT:', message, '\n');
}

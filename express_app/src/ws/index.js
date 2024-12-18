import { setupAMQP } from './protocols/amqpClient.js';
import { setupMQTT } from './protocols/mqttClient.js';
import { setupSTOMP } from './protocols/stompClient.js';
import { setupWebSocket } from './protocols/websocketClient.js';

setupAMQP();
setupMQTT();
setupSTOMP();
setupWebSocket();

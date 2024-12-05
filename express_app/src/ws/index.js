const WebSocket = require('ws');

function connect(protocol) {
    const ws = new WebSocket('ws://localhost:3100', protocol);

    ws.on('open', () => {
        console.log(`[${protocol}] Connected to server`);
    });

    ws.on('message', (data) => {
        const { protocol, message } = JSON.parse(data);
        console.log(`[${protocol}] Received message: ${message}`);
    });

    ws.on('close', () => {
        console.log(`[${protocol}] Connection closed`);
    });
}

// Подключаемся по четырем протоколам
['amqp', 'mqtt', 'stomp', 'custom'].forEach(connect);

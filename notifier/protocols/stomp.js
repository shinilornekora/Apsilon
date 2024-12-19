import WebSocket from 'ws';
import { v4 as uuidv4 } from 'uuid';
import * as Stomp from './helper.js';

const wss = new WebSocket.Server({ port: 3101 });
let clients = []

wss.on('connection', (ws) => {
    console.log('\nSERVER_HAS_FOUND_CLIENT\n');
    const sessionId = uuidv4();

    ws.on('message', function(message) {
        var frame = Stomp.process_frame(message);
        var headers = frame['headers'];

        switch(frame['command']) {
            case "CONNECT":
                clients.push({ client: ws, sid: sessionId });
                Stomp.send_frame(ws, {
                    command: "CONNECTED",
                    headers: {
                        session: sessionId,
                    },
                    content: ""
                });
                break;
            case "SUBSCRIBE":
                Stomp.send_frame(ws, {
                    command: "SUBSCRIBED",
                    headers: {
                        session: sessionId,
                    },
                    content: ""
                });
                break;
            default:
                Stomp.send_error(ws, "No valid command frame");
                break;
        }
    });

    ws.on('close', () => {
        console.log('Client disconnected');
        clients = clients.filter(client => client !== ws);
    });
})

// Функция для отправки сообщений всем подключенным клиентам
function sendToTopic(message) {
    clients.forEach(({ client, sid }) => {
        Stomp.send_frame(client, {
            command: 'MESSAGE',
            headers: {
                session: sid,
                subscription: 'sub-0',
            },
            content: message
        });
    });
}

export const sendSTOMP = (message) => {
    try {
        sendToTopic(message)
        console.log('Sent message via STOMP: ', message)
    } catch (error) {
        console.log('Сообщение не отправилось :/')
        console.log(error);
    }
}

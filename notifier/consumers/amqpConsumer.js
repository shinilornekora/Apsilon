import amqp from 'amqplib';
import { sendMessage } from '../services/notifier.js';

const AMQP_QUEUE = 'notifierQueue';

export async function startAMQPConsumer() {
    const connection = await amqp.connect('amqp://guest:guest@localhost');
    const channel = await connection.createChannel();
    await channel.assertQueue(AMQP_QUEUE, { durable: true });

    console.log(`Listening for messages on RabbitMQ queue: ${AMQP_QUEUE}`);

    channel.consume(AMQP_QUEUE, (msg) => {
        if (msg) {
            const message = msg.content.toString();
            console.log(`Received RabbitMQ message: ${message}`);

            // Отправляем через все протоколы
            sendMessage('amqp', message);
            sendMessage('mqtt', message);
            sendMessage('stomp', message);
            sendMessage('websocket', message);

            channel.ack(msg);
        }
    });
}

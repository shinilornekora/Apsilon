import amqp from 'amqplib';

const AMQP_QUEUE = 'notifierClientAMQPQueue';

export async function sendAMQP(message) {
    const connection = await amqp.connect('amqp://guest:guest@localhost');
    const channel = await connection.createChannel();

    await channel.assertQueue(AMQP_QUEUE, { durable: false });
    channel.sendToQueue(AMQP_QUEUE, Buffer.from(message));

    console.log('\nSent message via AMQP:', message, '\n');

    await channel.close();
    await connection.close();
}

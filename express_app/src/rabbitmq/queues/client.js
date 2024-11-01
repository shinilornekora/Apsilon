const amqp = require('amqplib');
const REQUEST_QUEUE = 'requestQueue';

module.exports = async function initClient() {
    try {
        const connection = await amqp.connect({
            hostname: "localhost",
            port: 5672,
            username: "guest",
            password: "guest",
            vhost: "/"
        });
        
        const channel = await connection.createChannel();
        await channel.assertQueue(REQUEST_QUEUE, { durable: true });
        console.log(`Queue "${REQUEST_QUEUE}" was successfully created and ready to use.`);
        
        return channel;
    } catch (error) {
        console.error('Failed to initialize RabbitMQ client:', error);
        throw error;
    }
};

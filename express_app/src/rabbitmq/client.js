const rabbit = require("rabbitmq-stream-js-client");
const { STREAM_NAME, STREAM_SIZE_RETENTION } = require('./constants');


module.exports = async function getClient() {
    console.log('[RABBIT_MQ]: Let\'s rock! Main connection in process...')
    const client = await rabbit.connect({
        vhost: "/",
        port: 5552,
        hostname: "localhost",
        username: "guest",
        password: "guest",
    });

    console.log('[RABBIT_MQ]: Good, let\'s see if stream exists...');
    await client.createStream({ 
        stream: STREAM_NAME, 
        arguments: { 
            "max-length-bytes": STREAM_SIZE_RETENTION 
        } 
    });

    // ensured, no doubts.
    return client;
}
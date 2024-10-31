const rabbit = require("rabbitmq-stream-js-client");
const { STREAM_NAME, STREAM_SIZE_RETENTION } = require('./constants');
const logger = new (require('../../logger'))('RABBIT_MQ');

module.exports = async function getClient() {
    logger.log('Let\'s rock! Main connection in process...')
    const client = await rabbit.connect({
        vhost: "/",
        port: 5552,
        hostname: "localhost",
        username: "guest",
        password: "guest",
    });

    logger.log('Good, let\'s see if stream exists...')
    await client.createStream({ 
        stream: STREAM_NAME, 
        arguments: { 
            "max-length-bytes": STREAM_SIZE_RETENTION 
        } 
    });

    logger.log('Stream was successfully inited... YAY!')

    return client;
}
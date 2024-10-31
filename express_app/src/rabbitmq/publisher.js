const { STREAM_NAME } = require('./constants');

module.exports = async function initPublisher(client) {
    try {
        const publisher = await client.declarePublisher({ 
            stream: STREAM_NAME 
        });

        return publisher
    } catch (fatal) {
        console.log('[RABBIT_MQ]: Publisher has no power to initializate...\n')
        console.log(fatal)
    }
}
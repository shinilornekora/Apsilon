const { STREAM_NAME } = require('./constants');
const logger = new (require('../../logger'))('RABBIT_MQ');

module.exports = async function initPublisher(client) {
    try {
        const publisher = await client.declarePublisher({ 
            stream: STREAM_NAME 
        });

        logger.log('Publisher was initializated!')

        return publisher
    } catch (fatal) {
        logger.log('Publisher has no power to initializate...\n')
        logger.log(fatal)
    }
}
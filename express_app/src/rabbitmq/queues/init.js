const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const initClient = require('./client');
const initPublisher = require('./publisher');

module.exports = async function initRabbitQueue(rabbitLogger, app) {
    const channel = await initClient().catch(
        (error) => rabbitLogger.log('Oops! Initialization failed for client:', error)
    );

    const publisher = await initPublisher(channel).catch(
        (error) => rabbitLogger.log('Oops! Initialization failed for publisher:', error)
    );
    
    if (!channel || !publisher) {
        return;
    }

    app.post('/send_to_rabbit', jsonParser, async (req, res) => {
        let data = req.body;

        if (!data) {
            return res.status(400).json({
                error: 'BAD_BODY',
                message: 'No data was detected in request.'
            });
        }
    
        try {
            data = JSON.stringify(data);
            rabbitLogger.log("Sending a message...");
                
            await publisher.send(data);
            res.status(200).json({ message: 'Message sent successfully!' });
        } catch (error) {
            rabbitLogger.log("NOT_JSON_BODY");
            rabbitLogger.log(error);
            res.status(400).json({
                error: 'BAD_BODY',
                message: 'Body is not a valid JSON.'
            });
        }
    });
    
    app.post('/fatality', async (req, res) => {
        rabbitLogger.log("Force connection reset was called..");

        await channel.close();
        rabbitLogger.log("Expected connection reset was accomplished, hooray :c");
        res.status(200).json({ message: 'Connection reset successfully.' });
    });

    rabbitLogger.log("RabbitMQ Queue initialization completed!");
};

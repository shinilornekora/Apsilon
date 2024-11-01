const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const initClient = require('./client');
const initPublisher = require('./publisher');

module.exports = async function initRabbitStream(rabbitLogger, app) {
    const client = await initClient().catch(
        (error) => rabbitLogger.log('Oops! Initialization failed for client:', error)
    );

    const publisher = await initPublisher(client).catch(
        (error) => rabbitLogger.log('Oops! Initialization failed for publisher:', error)
    );
    
    if (!client || !publisher) {
        return;
    }

    app.post('/send_to_rabbit', jsonParser, async (req, res) => {
        let data = req.body;

        if (!data) {
            return res.status(400).json({
                error: 'BAD_BODY',
                message: 'No data was detected in request.'
            })
        }
    
        try {
            data = JSON.stringify(data);
            rabbitLogger.log("Sending a message...");
                
            await publisher.send(Buffer.from(data));
        } catch (error) {
            rabbitLogger.log("NOT_JSON_BODY")
            rabbitLogger.log(error)
            res.status(400).json({
                error: 'BAD_BODY',
                message: 'Body is not a valid JSON.'
            })
        }
    });
    
    // Отладочное, наверное потом выпилить
    app.post('/fatality', async () => {
        rabbitLogger.log("Force connection reset was called..");

        await client.close();

        rabbitLogger.log("EXpected connection reset was accomplished, hooray :c");
    })

    rabbitLogger.log("Initializated the main source!");
}
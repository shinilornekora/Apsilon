/********************* PACKAGE DEPS *****************/
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { graphqlHTTP } = require('express-graphql');
const { readFileSync } = require('fs');
const { join } = require('path');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const jsonParser = bodyParser.json();
/****************************************************/

/******************** GLOBAL ***************/
const { HOST, PORT } = require('./src/constants');
const Logger = require('./logger');
const rabbitLogger = new Logger('RABBIT_MQ');
const serverLogger = new Logger('SERVER');
/********************************************/

/************* DB SYNC ***************/
const schema = require('./src/schema');
const { sequelize } = require('./src/models');

sequelize.sync().catch(
    error => serverLogger.log(
        `DB wasn't resolved, master! ${error.message}`
    )
);
/*************************************/

/************* GRAPH_QL INITIALIZATION ***************/
const resolvers = require('./src/graphql/resolvers');
const TYPEDEF_SCHEMA_PATH = join(__dirname, 'schema.graphql');
const typeDefs = readFileSync(TYPEDEF_SCHEMA_PATH, 'utf8');
const GRAPHQL_SCHEMA = makeExecutableSchema({
    typeDefs,
    resolvers,
});

app.use('/graphql', graphqlHTTP({
    schema: GRAPHQL_SCHEMA,
    graphiql: true,
}));
/*****************************************************/

/******************** MIDDLEWARES ************************* */
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
require('./src/middlewares').forEach(middleware => app.use(middleware));

Object.entries(schema).forEach(([path, { mode, handler }]) => {
    try {
        app[mode](path, jsonParser, handler);
    } catch (error) {
        // Сейвит если мод у ручки указан кривой.
        console.log(`[ERROR]: ${path} ${mode} is not supported.`);
    }
});
/*********************************************************** */

/********************* RABBIT INITIALIZATION *****************/
// Почитал про стримы, интересно.
// Вроде бы даже все нормально получилось настроить, но нам нужны очереди.
// const initRabbitStream = require('./src/rabbitmq/streams/init');
// initRabbitStream(rabbitLogger, app);

const initRabbitQueue = require('./src/rabbitmq/queues/init');
initRabbitQueue(rabbitLogger, app);
/*************************************************************/

/********************* UI ************************************/
app.get('/ui', (_, res) => {
    const path = join(__dirname, 'public.html');
    const content = readFileSync(path, 'utf8');

    res.send(content)
})

app.get('/data', (req, res) => {
    fs.readFile('data.txt', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading file');
        }
        res.send(data);
    });
});
/*********************************************************** */

app.listen(PORT, () => {
    serverLogger.log(`Service runs at ${HOST}:${PORT}`);
});
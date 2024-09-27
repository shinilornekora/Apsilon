const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const app = express();
const middlewares = require('./src/middlewares');

const schema = require('./src/schema');
const { sequelize } = require('./src/models');
const CONSTANTS = require('./src/constants');

sequelize.sync({ force: true }); 

middlewares.forEach(middleware => app.use(middleware));
app.use(express.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

Object.entries(schema).forEach(([path, { mode, handler }]) => {
    try {
        app[mode](path, jsonParser, handler);
    } catch (error) {
        // Сейвит если мод у ручки указан кривой.
        console.log(`[ERROR]: ${path} ${mode} is not suppored.`);
    }
});

app.listen(CONSTANTS.PORT, () => {
    console.log(`We run on http://localhost:${CONSTANTS.PORT}`);
});
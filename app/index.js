const app = require('express')();

const { sequelize } = require('./src/models');
const schema = require('./src/schema/schema');
const CONSTANTS = require('./src/constants');

sequelize.sync({ force: true }); 

Object.entries(schema).forEach(([path, { mode, handler }]) => {
    try {
        app[mode](path, handler);
    } catch (error) {
        console.log(`[ERROR]: ${path} ${mode} is not suppored.`);
    }
});

app.listen(CONSTANTS.PORT, () => {
    console.log(`We run on http://localhost:${CONSTANTS.PORT}`);
});
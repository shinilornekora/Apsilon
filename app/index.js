const app = require('express')();

const { sequelize } = require('./src/models');
const schema = require('./src/schema/schema');
const CONSTANTS = require('./src/constants');

sequelize.sync({ force: true }); 

Object.entries(schema).forEach(([path, { mode, handler }]) => {
    app[mode](path, handler);
});

app.listen(CONSTANTS.PORT, () => {
    console.log(`We run on http://localhost:${CONSTANTS.PORT}`);
});
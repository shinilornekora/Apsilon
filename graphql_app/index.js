const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { readFileSync } = require('fs');
const { join } = require('path');
const { sequelize } = require('./src/models');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const resolvers = require('./src/resolvers');
const { PORT, HOST } = require('./src/constants');

sequelize.sync({ force: true }).catch(
    error => console.log(`DB cannot be resolved, my lord! ${error.message}`)
);

const TYPEDEF_SCHEMA_PATH = join(__dirname, 'schema.graphql');
const typeDefs = readFileSync(TYPEDEF_SCHEMA_PATH, 'utf8');

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

const app = express();

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,
}));

app.listen(PORT, () => {
    console.log(`GraphQL API runs at ${HOST}:${PORT}/graphql`);
});

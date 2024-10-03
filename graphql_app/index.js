const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { readFileSync } = require('fs');
const { join } = require('path');
const { sequelize } = require('./src/models');
const resolvers = require('./src/resolvers');

sequelize.sync({ force: true });

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

app.listen(4000, () => {
    console.log('GraphQL API runs at http://localhost:4000/graphql');
});

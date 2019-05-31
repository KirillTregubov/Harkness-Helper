var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var morgan = require('morgan');
var express_graphql = require('express-graphql');
var {
    buildSchema
} = require('graphql');
// GraphQL schema
var schema = buildSchema(`
    type Query {
        message: String
    }
`);
// Root resolver
var root = {
    message: () => 'Hello World!'
};
// Create an express server and a GraphQL endpoint
var app = express();
app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());
app.listen(process.env.PORT || 8081)
// app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));
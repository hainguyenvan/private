const Express = require('express');

const { graphqlServer } = require('./graphql/graphql-server');
const app = new Express();

graphqlServer(app);
app.listen(8080);
console.log('Server running. Open http://localhost:8080/graphql to run queries.');
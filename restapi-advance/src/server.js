const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');

// const Middlewares = require('./middlewares/root');
const getErrorCode = require('./utils/errors');
const Config = require('./config/config');
const GraphqlSchema = require('./graphql/server/graphql-schema');

const port = Config.PORT_SEVER;
const app = express();

// create socket io
// const { createSocketIO } = require('./socket.io/socket-io');
// createSocketIO();

app.use(cors(), bodyParser.json());

const { graphiqlExpress, graphqlExpress } = require('apollo-server-express');

// set static folder
app.use('/api/files', express.static('src/public'));

// import router
const rootRouter = require('./routes/root');
app.use('/api', rootRouter);


app.use('/graphql', (req, res) => graphqlExpress({
    schema: GraphqlSchema,
    context: req,
    formatError: (errorType) => {
        let error = getErrorCode(errorType.message);
        return (error);
    },
    formatResponse: response => {
        response.status = 200;
        return response;
    },
})(req, res));
// app.use('/api', graphqlExpress({ GraphqlSchema }));
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

app.listen(
    port, () => {
        console.log(`Server started on port: ${port}`);
    }
);
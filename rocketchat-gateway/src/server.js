const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');

const Config = require('./config/config');

const port = Config.PORT_SEVER;
const app = express();

// create socket io
// const { createSocketIO } = require('./socket.io/socket-io');
// createSocketIO();

app.use(cors(), bodyParser.json());

// import router
const rootRouter = require('./routes/root');
app.use('/chatio', rootRouter);

app.listen(
    port, () => console.info(
        `Server started on port ${port}`
    )
);
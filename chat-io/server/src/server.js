const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const path = require('path');

const Config = require('./config/config');

const port = Config.PORT_SEVER;
const app = express();


// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);

// Middleware to catch 404 errors
// app.use(function (req, res, next) {
//     res.status(404).sendFile(process.cwd() + '/views/404.html');
// });

// create socket io
const { createSocketIO } = require('./socket.io/socket-io');
createSocketIO();

app.use(cors(), bodyParser.json());

// set static folder
app.use('/chatio/files', express.static('src/public'));
app.use('/chatio', express.static('src/public'));

// import router
const rootRouter = require('./routes/root');
app.use('/chatio', rootRouter);

app.listen(
    port, () => console.info(
        `Server started on port ${port}`
    )
);
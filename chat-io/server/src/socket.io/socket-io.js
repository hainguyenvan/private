const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const Constant = require('../config/constant');
const Config = require('../config/config');
const portSocketIO = Config.PORT_SOCKET_IO;

const nsp = io.of('/vietmed');

nsp.on('connection', function (socket) {
    socket.emit(Constant.SEND_CONNECTED_CHANNELS, { msg: 'vietmed socket connected.' });
});

// const { createSocketRepair } = require('./repair');
// createSocketRepair(nsp);

function createSocketIO() {
    http.listen(portSocketIO, function () {
        console.log('SocketIO open port: ', portSocketIO);
    })
}

module.exports = { createSocketIO };


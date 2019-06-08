const Config = require('../config/config');

const ioClient = require('socket.io-client');
const socketClient = ioClient.connect(Config.SOCKET_CLIENT_ROOT, { reconnect: true });

socketClient.on('operatorRepair_USR_0', function (data) {
    console.log(data);
});
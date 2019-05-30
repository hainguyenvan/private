var Sequelize = require('sequelize');

var Config = require('./config/config');

class ConnectDB {
    constructor() {
        this.sequelize = new Sequelize(
            Config.NAME_DB, Config.USERNAME_DB, Config.PASSWD_DB, {
                host: Config.HOST_DB,
                port: Config.PORT_DB,
                dialect: Config.PROTOCOL_DB,
                pool: {
                    max: 20,
                    min: 0,
                    acquire: 50000,
                    idle: 50000
                },
                define: {
                    timestamps: false
                }
            });
    }
}

module.exports = new ConnectDB();
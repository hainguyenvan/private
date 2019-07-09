const Sequelize = require('sequelize');

const Connect = require('../database/connect');
const Constant = require('../config/constant');

class AccountModel {
    constructor() {
        this.sequelize = Connect.sequelize;
        this.model = this.sequelize.define('Account', {
            id: {
                field: 'id',
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                field: 'name',
                type: Sequelize.STRING,
            },
            age: {
                field: 'age',
                type: Sequelize.STRING
            },
            address: {
                field: 'address',
                type: Sequelize.STRING
            }
        }, {
            tableName: 'Account'
        });
    }

    insert(data) {
        return new Promise((fulfill, reject) => {
            this.model.create(data)
                .then(result => {
                    fulfill(result);
                })
                .catch(err => {
                    reject(err);
                })
        })
    }
}

module.exports = new AccountModel();
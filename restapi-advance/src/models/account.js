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

    getAll() {
        return new Promise((fulfill, reject) => {
            let sql = `SELECT * FROM Account`;
            this.sequelize.query(sql, {
                type: this.sequelize.QueryTypes.SELECT
            }).then(dataList => {
                fulfill(dataList);
            }).catch(err => {
                reject(err)
            })
        });
    }

    getByID(id) {
        return new Promise((fulfill, reject) => {
            let sql = `SELECT * FROM Account where id = ${id}`;
            this.sequelize.query(sql, {
                type: this.sequelize.QueryTypes.SELECT
            }).then(dataList => {
                if (dataList.length === 0) {
                    fulfill({});
                }
                fulfill(dataList[0]);
            }).catch(err => {
                reject(err)
            })
        });
    }
}

module.exports = new AccountModel();
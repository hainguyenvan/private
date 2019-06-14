const Sequelize = require('sequelize');

const connect = require('../connect');

class AccountModel {
    constructor() {
        this.sequelize = connect.sequelize;
        this.model = this.sequelize.define('Account', {
            id: {
                field: 'id',
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            pk: {
                field: 'pk',
                type: Sequelize.STRING
            },
            username: {
                field: 'username',
                type: Sequelize.STRING
            },
            timeCreated: {
                field: 'timeCreated',
                type: Sequelize.INTEGER
            },
            timeModified: {
                field: 'timeModified',
                type: Sequelize.INTEGER
            },
        }, {
                tableName: 'Account'
            });
    }


    insert(account) {
        return new Promise((fulfill, reject) => {
            account.timeCreated = new Date().getTime();
            account.timeModified = new Date().getTime();
            this.model.create(account)
                .then(data => {
                    fulfill(data);
                })
                .catch(err => {
                    console.log(err);
                    reject(err);
                })
        });
    }

    getByPK(pk) {
        return new Promise((fulfill, reject) => {
            let sql = `SELECT * FROM Account  where pk = '${pk}'`
            this.sequelize.query(sql, {
                type: this.sequelize.QueryTypes.SELECT
            }).then(sourceList => {
                if (sourceList.length > 0) {
                    fulfill(sourceList[0]);
                }
                fulfill(null);
            }).catch(err => {
                console.log(err);
                reject(err)
            })
        });
    }

    getByUsername(username) {
        return new Promise((fulfill, reject) => {
            let sql = `SELECT * FROM Account  where username = '${username}'`
            this.sequelize.query(sql, {
                type: this.sequelize.QueryTypes.SELECT
            }).then(sourceList => {
                if (sourceList.length > 0) {
                    fulfill(sourceList[0]);
                }
                fulfill(null);
            }).catch(err => {
                console.log(err);
                reject(err)
            })
        });
    }

    getAll() {
        return new Promise((fulfill, reject) => {
            let sql = `SELECT * FROM Account`
            this.sequelize.query(sql, {
                type: this.sequelize.QueryTypes.SELECT
            }).then(sourceList => {
                fulfill(sourceList);
            }).catch(err => {
                console.log(err);
                reject(err)
            })
        })
    }

}

module.exports = new AccountModel();
const Sequelize = require('sequelize');

const Connect = require('../database/connect');
const Constant = require('../config/constant');

class RoleModel {
    constructor() {
        this.sequelize = Connect.sequelize;
        this.model = this.sequelize.define('Role', {
            id: {
                field: 'id',
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                field: 'name',
                type: Sequelize.STRING,
            }
        }, {
            tableName: 'Role'
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

    getRoleByAccountID(accountID) {
        return new Promise((fulfill, reject) => {
            let sql = `select * from Role
            inner join (select userID, roleID from UserRole where UserRole.userID = ${accountID} ) UserRole on UserRole.roleID = Role.id`
            this.sequelize.query(sql, {
                type: this.sequelize.QueryTypes.SELECT
            }).then(dataList => {
                fulfill(dataList);
            }).catch(err => {
                reject(err)
            })
        });
    }
}

module.exports = new RoleModel();
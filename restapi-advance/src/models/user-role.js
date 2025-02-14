const Sequelize = require('sequelize');

const Connect = require('../database/connect');
const Constant = require('../config/constant');

class UserRoleModel {
    constructor() {
        this.sequelize = Connect.sequelize;
        this.model = this.sequelize.define('UserRole', {
            id: {
                field: 'id',
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            userID: {
                field: 'userID',
                type: Sequelize.STRING,
            },
            roleID: {
                field: 'roleID',
                type: Sequelize.STRING,
            }
        }, {
            tableName: 'UserRole'
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

module.exports = new UserRoleModel();
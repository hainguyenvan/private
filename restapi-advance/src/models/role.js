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
}

module.exports = new RoleModel();
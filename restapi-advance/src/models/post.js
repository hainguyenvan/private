const Sequelize = require('sequelize');

const Connect = require('../database/connect');
const Constant = require('../config/constant');

class PostModel {
    constructor() {
        this.sequelize = Connect.sequelize;
        this.model = this.sequelize.define('Post', {
            id: {
                field: 'id',
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            title: {
                field: 'title',
                type: Sequelize.STRING
            },
            author: {
                field: 'author',
                type: Sequelize.INTEGER
            }
        }, {
            tableName: 'Post'
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

module.exports = new PostModel();
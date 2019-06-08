const Sequelize = require('sequelize');

const Connect = require('../connect');
const Constant = require('../config/constant');

class NotificationModel {
    constructor() {
        this.sequelize = Connect.sequelize;
        this.model = this.sequelize.define('Notification', {
            id: {
                field: 'id',
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            userPK: {
                field: 'userPK',
                type: Sequelize.STRING
            },
            content: {
                field: 'content',
                type: Sequelize.STRING
            },
            category: {
                field: 'category',
                type: Sequelize.INTEGER
            },
            img: {
                field: 'img',
                type: Sequelize.STRING
            },
            status: {
                field: 'status',
                type: Sequelize.INTEGER
            },
            unread: {
                field: "unread",
                type: Sequelize.STRING
            },
            recordPK: {
                field: "recordPK",
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
            createdBy: {
                field: "createdBy",
                type: Sequelize.STRING
            }
        }, {
                tableName: 'Notification'
            });
    }

    updateUnreadByID(data) {
        return new Promise((fulfill, reject) => {
            data.timeModified = new Date().getTime();
            this.model.update(data, {
                where: {
                    id: data.id
                }
            })
                .then(result =>
                    fulfill(result)
                )
                .catch(err =>
                    reject(err)
                )
        })
    }


    getAll() {
        return new Promise((fulfill, reject) => {
            this.model.findAll({
                raw: true
            }).then(notificationList => {
                fulfill(notificationList);
            }).catch(err => {
                reject(err);
            })
        })
    }

    insert(data) {
        return new Promise((fulfill, reject) => {
            this.model.create({
                userPK: data.userPK,
                content: data.content,
                category: data.category,
                img: data.img,
                recordPK: data.recordPK,
                createdBy: data.createdBy,
                status: 0,
                unread: 'unread',
                timeModified: new Date().getTime(),
                timeCreated: new Date().getTime()
            }).then(result => {
                fulfill(result);
            }).catch(err => {
                reject(err);
            })
        })
    }

    getByUserPK(userPK) {
        return new Promise((fulfill, reject) => {
            let sql = `select * from Notification where userPK = '${userPK}' and unread = 'unread' order by timeCreated desc`;
            this.sequelize.query(sql, {
                type: this.sequelize.QueryTypes.SELECT
            }).then(listOfNotifications => {
                if (listOfNotifications.length == 0) {
                    fulfill([]);
                }
                fulfill(listOfNotifications);
            }).catch(err => {
                reject(err)
            })
        })
    }

}

module.exports = new NotificationModel();
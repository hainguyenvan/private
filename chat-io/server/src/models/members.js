const Sequelize = require('sequelize');

const connect = require('../connect');

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array)
    }
}

class MembersModel {
    constructor() {
        this.sequelize = connect.sequelize;
        this.model = this.sequelize.define('Members', {
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
            userPK: {
                field: 'userPK',
                type: Sequelize.STRING
            },
            roomPK: {
                field: 'roomPK',
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
                tableName: 'Members'
            });
    }

    insert(data) {
        return new Promise((fulfill, reject) => {
            data.timeCreated = new Date().getTime();
            data.timeModified = new Date().getTime();
            this.model.create(data)
                .then(data => {
                    fulfill(data);
                })
                .catch(err => {
                    console.log(err);
                    reject(err);
                })
        });
    }

    getMembersByRoomPK(roomPK) {
        return new Promise((fulfill, reject) => {
            let sql = `select * from Account
                inner join ( select roomPK, userPK from Members where Members.roomPK = '${roomPK}') 
                Members on Members.userPK = Account.pk order by timeModified desc`
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

    insertMutipleByRoomPK(accounts, roomPK) {
        return new Promise(async (fulfill, reject) => {
            await asyncForEach(accounts, async (item) => {
                item.timeCreated = new Date().getTime();
                item.timeModified = new Date().getTime();
                item.roomPK = roomPK;
                await this.model.create(item);
            });
            fulfill(true);
        })
    }

    getByPK(pk) {
        return new Promise((fulfill, reject) => {
            let sql = `SELECT * FROM Members where pk = '${pk}'`
            this.sequelize.query(sql, {
                type: this.sequelize.QueryTypes.SELECT
            }).then(sourceList => {
                if (sourceList.length > 0) {
                    fulfill(sourceList[0]);
                }
                fufill({});
            }).catch(err => {
                console.log(err);
                reject(err)
            })
        });
    }

    getAll() {
        return new Promise((fulfill, reject) => {
            let sql = `SELECT * FROM Members`
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

module.exports = new MembersModel();
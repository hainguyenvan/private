const Sequelize = require('sequelize');

const connect = require('../connect');
const MembersModel = require('./members');

class RoomsModel {
    constructor() {
        this.sequelize = connect.sequelize;
        this.model = this.sequelize.define('Rooms', {
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
            name: {
                field: 'name',
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
                tableName: 'Rooms'
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

    getByPK(pk) {
        return new Promise((fulfill, reject) => {
            let sql = `SELECT * FROM Rooms  where pk = '${pk}'`
            this.sequelize.query(sql, {
                type: this.sequelize.QueryTypes.SELECT
            }).then(sourceList => {
                if (sourceList.length > 0) {
                    MembersModel.getMembersByRoomPK(pk)
                        .then(members => {
                            let room = sourceList[0];
                            room.members = members;
                            fulfill(room);
                        })
                        .catch(err => {
                            reject(err);
                        })
                } else {
                    fulfill({});
                }
            }).catch(err => {
                console.log(err);
                reject(err)
            })
        });
    }

    getAll() {
        return new Promise((fulfill, reject) => {
            let sql = `SELECT * FROM Rooms`
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

module.exports = new RoomsModel();
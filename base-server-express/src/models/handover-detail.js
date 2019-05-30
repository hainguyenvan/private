const Sequelize = require('sequelize');

const Connect = require('../connect');
const Constant = require('../config/constant');

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array)
    }
}

class HandoverDetailModel {
    constructor() {
        this.sequelize = Connect.sequelize;
        this.model = this.sequelize.define('HandoverDetail', {
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
            handoverPK: {
                field: 'handoverPK',
                type: Sequelize.STRING
            },
            itemPK: {
                field: 'itemPK',
                type: Sequelize.STRING
            },
            quantity: {
                field: 'quantity',
                type: Sequelize.INTEGER
            },
            dataStatus: {
                field: 'dataStatus',
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
            },
            modifiedBy: {
                field: "modifiedBy",
                type: Sequelize.STRING
            }
        }, {
                tableName: 'HandoverDetail'
            });
    }

    timeout(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    generatePK() {
        return new Promise((fulfill, reject) => {
            this.model.max('id')
                .then(maxID => {
                    maxID = maxID.toString() == 'NaN' ? 0 : maxID + 1;
                    let pk = Constant.HANDOVER_DETAIL_TBL_SHORT_NAME + '_' + maxID;
                    fulfill(pk);
                }).catch(err => {
                    reject(err);
                })
        });
    }

    insert(data) {
        return new Promise((fulfill, reject) => {
            this.generatePK()
                .then(pk => {
                    data.pk = pk;
                    data.timeCreated = new Date().getTime();
                    data.timeModified = new Date().getTime();
                    this.model.create(data)
                        .then(result => {
                            fulfill(result);
                        })
                })
                .catch(err => {
                    reject(err);
                })
        })
    }

    updateByPK(data) {
        return new Promise((fulfill, reject) => {
            data.timeModified = new Date().getTime();
            this.model.update(data, {
                where: {
                    pk: data.pk
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

    deleteByPK(data) {
        return new Promise((fulfill, reject) => {
            data.timeModified = new Date().getTime();
            data.dataStatus = 'deleted';
            this.model.update(data, {
                where: {
                    pk: data.pk
                }
            })
                .then(result =>
                    fulfill(true)
                )
                .catch(err =>
                    reject(err)
                )
        })
    }

    destroyByHandoverPK(handoverPK) {
        return new Promise((fulfill, reject) => {
            this.model.destroy({
                where: {
                    handoverPK: handoverPK
                }
            }).then(status => {
                fulfill(true);
            }).catch(err => {
                reject(err);
            })
        })
    }

    insertMultiple(payload) {
        return new Promise(async (fulfill, reject) => {
            await asyncForEach(payload.dataList, async (item) => {
                await this.timeout(300)
                await this.generatePK().then(async pk => {
                    item.pk = pk;
                    item.handoverPK = payload.handoverPK;
                    item.dataStatus = 'active';
                    item.createdBy = payload.userPK;
                    item.modifiedBy = payload.userPK;
                    item.timeCreated = new Date().getTime();
                    item.timeModified = new Date().getTime();
                    await this.model.create(item);
                })
                    .catch(err => {
                        reject(err);
                    })
            })
            fulfill(true);
        });
    }

    updateMultiple(payload) {
        return new Promise(async (fulfill, reject) => {
            this.destroyByHandoverPK(payload.handoverPK).then(async (status) => {
                await asyncForEach(payload.dataList, async (item) => {
                    item.timeCreated = new Date().getTime();
                    item.timeModified = new Date().getTime();
                    item.createdBy = payload.userPK;
                    item.modifiedBy = payload.userPK;
                    item.dataStatus = 'active';
                    item.handoverPK = payload.handoverPK;
                    await this.timeout(300);
                    await this.generatePK().then(async (pk) => {
                        item.pk = pk;
                        await this.model.create(item);
                    })
                });
                fulfill(true);
            }).catch(err => {
                reject(err)
            })
        })
    }

    getByHandoverPK(handoverPK) {
        return new Promise((fulfill, reject) => {
            let sql = `select * from HandoverDetail where handoverPK = '${handoverPK}' order by timeModified desc`;
            this.sequelize.query(sql, {
                type: this.sequelize.QueryTypes.SELECT
            }).then(sourceList => {
                fulfill(sourceList);
            }).catch(err => {
                reject(err)
            })
        })
    }

    getAll() {
        return new Promise((fulfill, reject) => {
            this.model.findAll({
                raw: true
            }).then(agentList => {
                fulfill(agentList);
            }).catch(err => {
                reject(err);
            })
        })
    }

    getByDataStatus(status) {
        return new Promise((fulfill, reject) => {
            this.model.findAll({
                raw: true,
                where: {
                    status: status
                }
            }).then(agentList => {
                fulfill(agentList);
            }).catch(err => {
                reject(err);
            })
        })
    }

    getByPK(pk) {
        return new Promise((fulfill, reject) => {
            this.model.findOne({
                raw: true,
                where: {
                    pk: pk
                }
            }).then(agent => {
                fulfill(agent);
            }).catch(err => {
                reject(err);
            })
        })
    }
}

module.exports = new HandoverDetailModel();
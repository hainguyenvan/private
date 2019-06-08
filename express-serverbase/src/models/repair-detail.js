const Sequelize = require('sequelize');

const Connect = require('../connect');
const Constant = require('../config/constant');

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array)
    }
}

class RepairDetailModel {
    constructor() {
        this.sequelize = Connect.sequelize;
        this.model = this.sequelize.define('RepairDetail', {
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
            repairPK: {
                field: 'repairPK',
                type: Sequelize.STRING
            },
            errorContent: {
                field: 'errorContent',
                type: Sequelize.STRING
            },
            solution: {
                field: 'solution',
                type: Sequelize.INTEGER
            },
            price: {
                field: 'price',
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
                tableName: 'RepairDetail'
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
                    let pk = Constant.REPAIR_DETAIL_TBL_SHORT_NAME + '_' + maxID;
                    fulfill(pk);
                }).catch(err => {
                    reject(err);
                })
        });
    }

    destroyByRepairPK(repairPK) {
        return new Promise((fulfill, reject) => {
            this.model.destroy({
                where: {
                    repairPK: repairPK
                }
            }).then(status => {
                fulfill(true);
            }).catch(err => {
                reject(err);
            })
        })
    }

    destroyByPK(pk) {
        return new Promise((fulfill, reject) => {
            this.model.destroy({
                where: {
                    pk: pk
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
                    item.repairPK = payload.repairPK;
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
            this.destroyByRepairPK(payload.repairPK).then(async (status) => {
                await asyncForEach(payload.dataList, async (item) => {
                    item.timeCreated = new Date().getTime();
                    item.timeModified = new Date().getTime();
                    item.createdBy = payload.userPK;
                    item.modifiedBy = payload.userPK;
                    item.dataStatus = 'active';
                    item.repairPK = payload.repairPK;
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

    getByRepairPK(repairPK) {
        return new Promise((fulfill, reject) => {
            let sql = `select * from RepairDetail where repairPK = '${repairPK}' order by timeModified desc`;
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

module.exports = new RepairDetailModel();
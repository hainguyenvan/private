const Sequelize = require('sequelize');

const Connect = require('../connect');
const Constant = require('../config/constant');

class RepairModel {
    constructor() {
        this.sequelize = Connect.sequelize;
        this.model = this.sequelize.define('Repair', {
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
            type: {
                field: 'type',
                type: Sequelize.STRING
            },
            operator: {
                field: 'operator',
                type: Sequelize.STRING
            },
            repairDate: {
                field: 'repairDate',
                type: Sequelize.INTEGER
            },
            repairAddress: {
                field: 'repairAddress',
                type: Sequelize.STRING
            },
            repairPlace: {
                field: 'repairPlace',
                type: Sequelize.STRING
            },
            devicePK: {
                field: 'devicePK',
                type: Sequelize.STRING
            },
            customerPK: {
                field: 'customerPK',
                type: Sequelize.STRING
            },
            note: {
                field: 'note',
                type: Sequelize.STRING
            },
            diagnose: {
                field: 'diagnose',
                type: Sequelize.STRING
            },
            dataStatus: {
                field: 'dataStatus',
                type: Sequelize.STRING
            },
            status: {
                field: 'status',
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
                tableName: 'Repair'
            });
    }

    generatePK() {
        return new Promise((fulfill, reject) => {
            this.model.max('id')
                .then(maxID => {
                    maxID = maxID.toString() == 'NaN' ? 0 : maxID + 1;
                    let pk = Constant.REPAIR_TBL_SHORT_NAME + '_' + maxID;
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
                    data.status = 'pending';
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

    getDeviceDetailByPK(repairPK) {
        return new Promise((fulfill, reject) => {
            let sql = `select * from Device
                inner join (select pk as pkRepair,devicePK from Repair where pk = '${repairPK}') Repair on Repair.devicePK  = Device.pk`;
            this.sequelize.query(sql, {
                type: this.sequelize.QueryTypes.SELECT
            }).then(sourceList => {
                fulfill(sourceList[0]);
            }).catch(err => {
                reject(err)
            })
        })

    }
}

module.exports = new RepairModel();
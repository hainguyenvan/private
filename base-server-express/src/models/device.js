const Sequelize = require('sequelize');

const Connect = require('../connect');
const Constant = require('../config/constant');

class DeviceModel {
    constructor() {
        this.sequelize = Connect.sequelize;
        this.model = this.sequelize.define('Device', {
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
            serial: {
                field: 'serial',
                type: Sequelize.STRING
            },
            status: {
                field: 'status',
                type: Sequelize.STRING
            },
            modelPK: {
                field: 'modelPK',
                type: Sequelize.STRING
            },
            healthStatus: {
                field: 'healthStatus',
                type: Sequelize.STRING
            },
            importDate: {
                field: 'importDate',
                type: Sequelize.INTEGER
            },
            guaranteeExpiredDate: {
                field: 'guaranteeExpiredDate',
                type: Sequelize.INTEGER
            },
            manufactureGuaranteeDate: {
                field: 'manufactureGuaranteeDate',
                type: Sequelize.INTEGER
            },
            manufactureDate: {
                field: 'manufactureDate',
                type: Sequelize.INTEGER
            },
            customerPK: {
                field: 'customerPK',
                type: Sequelize.STRING
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
                tableName: 'Device'
            });
    }

    generatePK() {
        return new Promise((fulfill, reject) => {
            this.model.max('id')
                .then(maxID => {
                    maxID = maxID.toString() == 'NaN' ? 0 : maxID + 1;
                    let pk = Constant.DEVICE_TBL_SHORT_NAME + '_' + maxID;
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
                    dataStatus: status
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

    search(payload) {
        return new Promise((fulfill, reject) => {
            let sql = `select * from Device where dataStatus != 'deleted' `;
            if (payload.customerPK !== undefined && payload.customerPK !== '' && payload.customerPK !== 'all') {
                sql += ` and customerPK = '${payload.customerPK}'`
            }
            if (payload.status !== undefined && payload.status !== null && payload.status !== 'all') {
                sql += `and status = '${payload.status}'`;
            }
            sql += ` order by timeCreated desc`;
            this.sequelize.query(sql, {
                type: this.sequelize.QueryTypes.SELECT
            }).then(sourceList => {
                fulfill(sourceList);
            }).catch(err => {
                reject(err)
            })
        })
    }
}

module.exports = new DeviceModel();
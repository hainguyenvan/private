const Sequelize = require('sequelize');

const Connect = require('../connect');
const Constant = require('../config/constant');

class MaterialModel {
    constructor() {
        this.sequelize = Connect.sequelize;
        this.model = this.sequelize.define('Material', {
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
            specifications: {
                field: 'specifications',
                type: Sequelize.STRING
            },
            usingFor: {
                field: 'usingFor',
                type: Sequelize.STRING
            },
            unit: {
                field: 'unit',
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
                tableName: 'Material'
            });
    }

    generatePK() {
        return new Promise((fulfill, reject) => {
            this.model.max('id')
                .then(maxID => {
                    maxID = maxID.toString() == 'NaN' ? 0 : maxID + 1;
                    let pk = Constant.MATERIAL_TBL_SHORT_NAME + '_' + maxID;
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

    getInOutTotalByPK(type, pk) {
        return new Promise((fulfill, reject) => {
            if (pk === undefined || type === undefined) {
                fulfill(null);
            }
            let sql = `SELECT SUM(quantity) AS toltal FROM MaterialIO 
            inner join (select pk from MaterialIOGroup where dataStatus != 'deleted' 
            and action = '${type}') MaterialIOGroup on 
            MaterialIOGroup.pk = MaterialIO.ioGroupPK where materialPK = '${pk}'`;
            this.sequelize.query(sql, {
                type: this.sequelize.QueryTypes.SELECT
            }).then(data => {
                let total = data === undefined ? null : data[0].toltal;
                fulfill(total);
            }).catch(err => {
                reject(err)
            })
        })

    }

    search(payload) {
        return new Promise((fulfill, reject) => {
            let sql = `select * from Material where dataStatus != 'deleted' `;
            if (payload.usingFor !== undefined && payload.usingFor !== '' && payload.usingFor !== 'all') {
                sql += ` and usingFor = '${payload.usingFor}'`
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

module.exports = new MaterialModel();
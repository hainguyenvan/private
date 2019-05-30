const Sequelize = require('sequelize');

const Connect = require('../connect');
const Constant = require('../config/constant');

class CustomerModel {
    constructor() {
        this.sequelize = Connect.sequelize;
        this.model = this.sequelize.define('Customer', {
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
            address: {
                field: 'address',
                type: Sequelize.STRING
            },
            place: {
                field: 'place',
                type: Sequelize.STRING
            },
            contactPhone: {
                field: 'contactPhone',
                type: Sequelize.STRING
            },
            contactPerson: {
                field: 'contactPerson',
                type: Sequelize.STRING
            },
            contactEmail: {
                field: 'contactEmail',
                type: Sequelize.STRING
            },
            contactTitle: {
                field: 'contactTitle',
                type: Sequelize.STRING
            },
            supportRegionPK: {
                field: 'supportRegionPK',
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
                tableName: 'Customer'
            });
    }

    generatePK() {
        return new Promise((fulfill, reject) => {
            this.model.max('id')
                .then(maxID => {
                    maxID = maxID.toString() == 'NaN' ? 0 : maxID + 1;
                    let pk = Constant.CUSTOMER_TBL_SHORT_NAME + '_' + maxID;
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
            let locationSql = `select pk as pkLocation, codeHuyen, code as codeLoaction, codeTinh from Location where dataStatus != 'deleted'`;
            let isSearchLocation = false;
            if (payload.codeTinh !== undefined && payload.codeTinh !== 'all' && payload.codeTinh !== '') {
                locationSql += ` and codeTinh = '${payload.codeTinh}'`;
                isSearchLocation = true;
            }
            if (payload.codeHuyen !== undefined && payload.codeHuyen !== 'all' && payload.codeHuyen !== '') {
                isSearchLocation = true;
                locationSql += ` and codeHuyen = '${payload.codeHuyen}'`;
            }
            if (payload.codeXa !== undefined && payload.codeXa !== 'all' && payload.codeXa !== '') {
                isSearchLocation = true;
                locationSql += ` and code = '${payload.codeXa}'`;
            }
            let sql = '';
            if (isSearchLocation) {
                sql = `
                    select * from Customer inner join (${locationSql} ) Location on Location.pkLocation = Customer.place
                    where Customer.dataStatus != 'deleted' order by Customer.timeModified desc
                    `;
            } else {
                sql = `
                select * from Customer where Customer.dataStatus != 'deleted' order by Customer.timeModified desc
                `;
            }
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

module.exports = new CustomerModel();
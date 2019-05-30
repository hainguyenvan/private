const Sequelize = require('sequelize');

const Connect = require('../connect');
const Constant = require('../config/constant');

class LocationModel {
    constructor() {
        this.sequelize = Connect.sequelize;
        this.model = this.sequelize.define('Location', {
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
            code: {
                field: 'code',
                type: Sequelize.STRING
            },
            codeHuyen: {
                field: 'codeHuyen',
                type: Sequelize.STRING
            },
            codeTinh: {
                field: 'codeTinh',
                type: Sequelize.STRING
            },
            fullName: {
                field: 'fullName',
                type: Sequelize.STRING
            },
            ggMappedName: {
                field: 'ggMappedName',
                type: Sequelize.STRING
            },
            ggMatched: {
                field: 'ggMatched',
                type: Sequelize.STRING
            },
            ggName: {
                field: 'ggName',
                type: Sequelize.STRING
            },
            ggFormattedAddress: {
                field: 'ggFormattedAddress',
                type: Sequelize.STRING
            },
            huyen: {
                field: 'huyen',
                type: Sequelize.STRING
            },
            huyenKhongDau: {
                field: 'huyenKhongDau',
                type: Sequelize.STRING
            },
            nameKhongDau: {
                field: 'nameKhongDau',
                type: Sequelize.STRING
            },
            parentId: {
                field: 'parentId',
                type: Sequelize.STRING
            },
            placeName: {
                field: 'placeName',
                type: Sequelize.STRING
            },
            placeType: {
                field: 'placeType',
                type: Sequelize.STRING
            },
            pre: {
                field: 'pre',
                type: Sequelize.STRING
            },
            tinh: {
                field: 'tinh',
                type: Sequelize.STRING
            },
            type: {
                field: 'type',
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
                tableName: 'Location'
            });
    }

    generatePK() {
        return new Promise((fulfill, reject) => {
            this.model.max('id')
                .then(maxID => {
                    maxID = maxID.toString() == 'NaN' ? 0 : maxID + 1;
                    let pk = Constant.LOCATION_TBL_SHORT_NAME + '_' + maxID;
                    fulfill(pk);
                }).catch(err => {
                    reject(err);
                })
        });
    }

    import(data) {
        return new Promise((fulfill, reject) => {
            data.timeCreated = new Date().getTime();
            data.timeModified = new Date().getTime();
            this.model.create(data)
                .then(result => {
                    fulfill(result);
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

    getByDataStatus(dataStatus) {
        return new Promise((fulfill, reject) => {
            this.model.findAll({
                raw: true,
                where: {
                    dataStatus: dataStatus
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

    getHuyenByTinh(codeTinh) {
        return new Promise((fulfill, reject) => {
            let sql = `select * from Location WHERE dataStatus != 'deleted' and codeTinh = '${codeTinh}' and placeType = 'H'`;
            sql = sql + ` order by Location.timeCreated desc`;

            this.sequelize.query(sql, {
                type: this.sequelize.QueryTypes.SELECT
            }).then(equipmentList => {
                fulfill(equipmentList);
            }).catch(err => {
                reject(err)
            })
        })
    }

    getXaByHuyen(codeHuyen) {
        return new Promise((fulfill, reject) => {
            let sql = `select * from Location WHERE dataStatus != 'deleted' and codeHuyen = '${codeHuyen}' and placeType = 'X'`;
            sql = sql + ` order by Location.timeCreated desc`;

            this.sequelize.query(sql, {
                type: this.sequelize.QueryTypes.SELECT
            }).then(equipmentList => {
                fulfill(equipmentList);
            }).catch(err => {
                reject(err)
            })
        })
    }

    getAllTinh() {
        return new Promise((fulfill, reject) => {
            let sql = `select * from Location WHERE dataStatus != 'deleted' and placeType = 'T'`;
            sql = sql + ` order by Location.timeCreated desc`;

            this.sequelize.query(sql, {
                type: this.sequelize.QueryTypes.SELECT
            }).then(equipmentList => {
                fulfill(equipmentList);
            }).catch(err => {
                reject(err)
            })
        })
    }

}

module.exports = new LocationModel();
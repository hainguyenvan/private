const Sequelize = require('sequelize');

const Connect = require('../connect');
const Constant = require('../config/constant');

class CategoryModel {
    constructor() {
        this.sequelize = Connect.sequelize;
        this.model = this.sequelize.define('Category', {
            id: {
                field: 'id',
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            categoryType: {
                field: 'categoryType',
                type: Sequelize.STRING
            },
            code: {
                field: 'code',
                type: Sequelize.STRING
            },
            value: {
                field: 'value',
                type: Sequelize.STRING
            },
            pk: {
                field: 'pk',
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
                tableName: 'Category'
            });
    }

    generatePK() {
        return new Promise((fulfill, reject) => {
            this.model.max('id')
                .then(maxID => {
                    maxID = maxID.toString() == 'NaN' ? 0 : maxID + 1;
                    let pk = Constant.CATEGORY_TBL_SHORT_NAME + '_' + maxID;
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

    getByCategoryType(categoryType) {
        return new Promise((fulfill, reject) => {
            this.model.findAll({
                raw: true,
                where: {
                    categoryType: categoryType,
                    dataStatus: {
                        $ne: 'deleted'
                    }
                }
            }).then(categoryList => {
                fulfill(categoryList);
            }).catch(err => {
                reject(err);
            })
        })
    }

    getAll() {
        return new Promise((fulfill, reject) => {
            this.model.findAll({
                raw: true
            }).then(categoryList => {
                fulfill(categoryList);
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
            }).then(categoryList => {
                fulfill(categoryList);
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
            }).then(category => {
                fulfill(category);
            }).catch(err => {
                reject(err);
            })
        })
    }

    getByCategoryType(categoryType) {
        return new Promise((fulfill, reject) => {
            let sql = `select * from Category WHERE dataStatus != 'deleted'`;
            sql = sql + ` AND Category.categoryType = '${categoryType}'`;
            sql = sql + ` order by Category.timeCreated desc`;

            this.sequelize.query(sql, {
                type: this.sequelize.QueryTypes.SELECT
            }).then(equipmentList => {
                fulfill(equipmentList);
            }).catch(err => {
                reject(err)
            })
        })
    }

    search(payload) {
        return new Promise((fulfill, reject) => {
            let sql = `select * from Category WHERE dataStatus != 'deleted'`;
            if (payload.code != null && payload.code != 'all' && payload.code != '') {
                sql = sql + ` AND Category.code LIKE '%${payload.code}%'`
            }
            if (payload.categoryType != undefined && payload.categoryType != "" && payload.categoryType != 'all') {
                sql = sql + ` AND Category.categoryType = '${payload.categoryType}'`;
            }
            sql = sql + ` order by Category.timeCreated desc`;

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

module.exports = new CategoryModel();
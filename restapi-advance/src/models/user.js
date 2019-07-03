const Sequelize = require('sequelize');

const Connect = require('../connect');
const Constant = require('../config/constant');

class UserModel {
    constructor() {
        this.sequelize = Connect.sequelize;
        this.model = this.sequelize.define('User', {
            id: {
                field: 'id',
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            pk: {
                field: 'pk',
                type: Sequelize.STRING,
            },
            code: {
                field: 'code',
                type: Sequelize.STRING
            },
            email: {
                field: 'email',
                type: Sequelize.STRING
            },
            phone: {
                field: 'phone',
                type: Sequelize.STRING
            },
            address: {
                field: 'address',
                type: Sequelize.STRING
            },
            gender: {
                field: 'gender',
                type: Sequelize.STRING
            },
            avatar: {
                field: 'avatar',
                type: Sequelize.STRING
            },
            dataStatus: {
                field: 'dataStatus',
                type: Sequelize.STRING
            },
            regionPK: {
                field: 'regionPK',
                type: Sequelize.STRING
            },
            password: {
                field: 'password',
                type: Sequelize.STRING
            },
            fullName: {
                field: 'fullName',
                type: Sequelize.STRING
            },
            timeCreated: {
                field: 'timeCreated',
                type: Sequelize.STRING
            },
            timeModified: {
                field: 'timeModified',
                type: Sequelize.STRING
            },
            jobtitle: {
                field: 'jobtitle',
                type: Sequelize.STRING
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
                tableName: 'User'
            });
    }

    generatePK() {
        return new Promise((fulfill, reject) => {
            this.model.max('id')
                .then(maxID => {
                    maxID = maxID.toString() == 'NaN' ? 0 : maxID + 1;
                    let pk = Constant.USER_TBL_SHORT_NAME + '_' + maxID;
                    fulfill(pk);
                }).catch(err => {
                    reject(err);
                })
        });
    }

    isCheckCode(code) {
        return new Promise((fulfill, reject) => {
            let sql = `select * from User where code='${code}' and dataStatus != 'deleted'`;
            this.sequelize.query(sql, {
                type: this.sequelize.QueryTypes.SELECT
            }).then(dataList => {
                if (dataList.length === 0) {
                    fulfill(false);
                }
                fulfill(true);
            }).catch(err => {
                reject(err)
            })
        })
    }

    validateUser(email, passwd) {
        return new Promise((fulfill, reject) => {
            let sql = `select * from User WHERE email = '${email}'`;
            sql = sql + ` and password = '${passwd}' and dataStatus != 'deleted'`;

            this.sequelize.query(sql, {
                type: this.sequelize.QueryTypes.SELECT
            }).then(dataList => {
                if (dataList.length === 0) {
                    reject(false);
                }
                fulfill(dataList[0]);
            }).catch(err => {
                reject(err)
            })
        })
    }

    isEmail(email) {
        return new Promise((fulfill, reject) => {
            let sql = `select * from User WHERE email = '${email}' and dataStatus != 'deleted'`;
            this.sequelize.query(sql, {
                type: this.sequelize.QueryTypes.SELECT
            }).then(dataList => {
                if (dataList.length === 0) {
                    fulfill(false);
                }
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
                    data.dataStatus = 'active';
                    this.model.create(data).then(async (user) => {
                        fulfill(user);
                    })
                }).catch(err => {
                    reject(err);
                })
        })
    }

    deleteByPK(data) {
        return new Promise((fulfill, reject) => {
            data.dataStatus = 'deleted';
            data.timeUpdate = new Date().getTime();
            this.model.update(data, {
                where: {
                    pk: data.pk
                }
            })
                .then(result => {
                    fulfill(true);
                })
                .catch(err => {
                    reject(err);
                });
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
                .then((result) => {
                    fulfill(result);
                })
                .catch(err => {
                    reject(err)
                });
        })
    }

    resetPassword(data) {
        return new Promise((fulfill, reject) => {
            this.model.update({
                password: data.password
            }, {
                    where: {
                        pk: data.pk
                    }
                })
                .then(result => {
                    fulfill(result);
                })
                .catch(err => {
                    reject(err);
                });
        })
    }

    getAll() {
        return new Promise((fulfill, reject) => {
            this.model.findAll({
                raw: false,
            })
                .then(users => {
                    fulfill(users);
                })
                .catch(err => {
                    reject(err);
                })
        });
    }

    getByDataStatus(datatStatus) {
        return new Promise((fulfill, reject) => {
            this.model.findAll({
                raw: true,
                datatStatus: datatStatus
            })
                .then(users => {
                    fulfill(users);
                })
                .catch(err => {
                    reject(err);
                });
        })
    }

    getByPK(pk) {
        return new Promise((fulfill, reject) => {
            let sql = `select * from User where dataStatus != 'deleted' `;
            sql += `and pk = '${pk}' limit 1`;
            this.sequelize.query(sql, {
                type: this.sequelize.QueryTypes.SELECT
            }).then(users => {
                if (users.length === 0) {
                    fulfill(null);
                }
                fulfill(users[0]);
            }).catch(err => {
                reject(err)
            })
        })
    }
}

module.exports = new UserModel();
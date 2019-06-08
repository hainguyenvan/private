const RepairModel = require('../models/repair');
const RepairDetailModel = require('../models/repair-detail');
const { ErrorName } = require('../config/error-type');
const { decodeToke } = require('../utils/utils');
const { emitUpdateOperator, emitUpdateStatus } = require('../socket.io/repair');

class RepairController {
    constructor() {
    }

    getAll() {
        return new Promise((fulfill, reject) => {
            RepairModel.getAll()
                .then(dataList => {
                    fulfill(dataList);
                })
                .catch(err => {
                    console.log(err);
                    reject(ErrorName.OTHER);
                })
        })
    }

    getByPK(pk) {
        return new Promise((fulfill, reject) => {
            if (pk === undefined || pk === null || pk === '') {
                fulfill(null);
            }
            RepairModel.getByPK(pk)
                .then(repair => {
                    fulfill(repair);
                })
                .catch(err => {
                    console.log(err);
                    reject(ErrorName.OTHER);
                })
        })
    }

    getByDataStatus(status) {
        return new Promise((fulfill, reject) => {
            RepairModel.getByDataStatus(status)
                .then(dataList => {
                    fulfill(dataList);
                })
                .catch(err => {
                    console.log(err);
                    reject(ErrorName.OTHER);
                })
        });
    }

    insert(payload) {
        let tokenData = decodeToke(payload.token);
        payload.createdBy = tokenData.pk;
        payload.modifiedBy = tokenData.pk;
        return new Promise((fulfill, reject) => {
            RepairModel.insert(payload)
                .then(repair => {
                    // build handover detail
                    let detailInput = {
                        userPK: tokenData.pk,
                        repairPK: repair.pk,
                        dataList: payload.repairDetails
                    }
                    RepairDetailModel.insertMultiple(detailInput)
                        .then(detail => {
                            fulfill(repair);
                        })
                        .catch(err => {
                            console.log(err);
                            reject(ErrorName.OTHER);
                        })
                })
                .catch(err => {
                    console.log(err);
                    reject(ErrorName.OTHER);
                })
        });
    }

    updateStatusByPK(payload) {
        let tokenData = decodeToke(payload.token);
        payload.modifiedBy = tokenData.pk;
        return new Promise((fulfill, reject) => {
            RepairModel.updateByPK(payload)
                .then(reapir => {
                    let notify = payload;
                    notify.createdBy = tokenData.pk;
                    notify.repairStatus = payload.status;
                    emitUpdateStatus(notify)
                        .then(status => {
                            console.log('emit update status repair to client done!');
                        })
                        .catch(err => {
                            console.log(err);
                        })
                    fulfill(true);
                })
                .catch(err => {
                    console.log(err);
                    reject(ErrorName.OTHER);
                })
        });
    }

    assignOperatorByPKRepair(payload) {
        let tokenData = decodeToke(payload.token);
        payload.modifiedBy = tokenData.pk;
        payload.status = 'assigned';
        return new Promise((fulfill, reject) => {
            RepairModel.updateByPK(payload)
                .then(reapir => {
                    let notify = payload;
                    notify.createdBy = tokenData.pk;
                    // notify operator
                    emitUpdateOperator(notify)
                        .then(status => {
                            console.log('emit operator repair to client done!');
                        })
                        .catch(err => {
                            console.log(err);
                        })
                    fulfill(true);
                })
                .catch(err => {
                    console.log(err);
                    reject(ErrorName.OTHER);
                })
        });
    }

    updateByPK(payload) {
        let tokenData = decodeToke(payload.token);
        payload.modifiedBy = tokenData.pk;
        return new Promise((fulfill, reject) => {
            RepairModel.updateByPK(payload)
                .then(reapir => {
                    // build handover detail
                    let detailInput = {
                        userPK: tokenData.pk,
                        repairPK: payload.pk,
                        dataList: payload.repairDetails
                    }
                    RepairDetailModel.updateMultiple(detailInput)
                        .then(detail => {
                            fulfill(true);
                        })
                        .catch(err => {
                            console.log(err);
                            reject(ErrorName.OTHER);
                        })
                })
                .catch(err => {
                    console.log(err);
                    reject(ErrorName.OTHER);
                })
        });
    }

    deleteByPK(payload) {
        let tokenData = decodeToke(payload.token);
        payload.modifiedBy = tokenData.pk;
        return new Promise((fulfill, reject) => {
            RepairModel.deleteByPK(payload)
                .then(status => {
                    fulfill(status);
                })
                .catch(err => {
                    console.log(err);
                    reject(err);
                })
        })
    }
}

module.exports = new RepairController();
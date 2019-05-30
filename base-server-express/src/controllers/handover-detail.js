const HandoverDetailModel = require('../models/handover-detail');
const { ErrorName } = require('../config/error-type');
const { decodeToke } = require('../utils/utils');

class HandoverDetailController {
    constructor() {
    }

    getAll() {
        return new Promise((fulfill, reject) => {
            HandoverDetailModel.getAll()
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
            HandoverDetailModel.getByPK(pk)
                .then(handoverDetail => {
                    fulfill(handoverDetail);
                })
                .catch(err => {
                    console.log(err);
                    reject(ErrorName.OTHER);
                })
        })
    }

    getByHandoverPK(handoverPK) {
        return new Promise((fulfill, reject) => {
            if (handoverPK === undefined || handoverPK === null || handoverPK === '') {
                fulfill(null);
            }
            HandoverDetailModel.getByHandoverPK(handoverPK)
                .then(handoverDetail => {
                    fulfill(handoverDetail);
                })
                .catch(err => {
                    console.log(err);
                    reject(ErrorName.OTHER);
                })
        })
    }

    getByDataStatus(status) {
        return new Promise((fulfill, reject) => {
            HandoverDetailModel.getByDataStatus(status)
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
            HandoverDetailModel.insert(payload)
                .then(data => {
                    fulfill(data);
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
            HandoverDetailModel.updateByPK(payload)
                .then(data => {
                    fulfill(data);
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
            HandoverDetailModel.deleteByPK(payload)
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

module.exports = new HandoverDetailController();
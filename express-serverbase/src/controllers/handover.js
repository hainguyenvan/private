const HandoverModel = require('../models/handover');
const HandoverDetailModel = require('../models/handover-detail');
const { ErrorName } = require('../config/error-type');
const { decodeToke } = require('../utils/utils');

class HandoverController {
    constructor() {
    }

    getAll() {
        return new Promise((fulfill, reject) => {
            HandoverModel.getAll()
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
            HandoverModel.getByPK(pk)
                .then(handover => {
                    fulfill(handover);
                })
                .catch(err => {
                    console.log(err);
                    reject(ErrorName.OTHER);
                })
        })
    }

    getByDataStatus(status) {
        return new Promise((fulfill, reject) => {
            HandoverModel.getByDataStatus(status)
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
            HandoverModel.insert(payload)
                .then(model => {
                    // build handover detail
                    let detailInput = {
                        userPK: tokenData.pk,
                        handoverPK: model.pk,
                        dataList: payload.handoverDetails
                    }
                    HandoverDetailModel.insertMultiple(detailInput)
                        .then(detail => {
                            fulfill(model);
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

    updateByPK(payload) {
        let tokenData = decodeToke(payload.token);
        payload.modifiedBy = tokenData.pk;
        return new Promise((fulfill, reject) => {
            HandoverModel.updateByPK(payload)
                .then(model => {
                    // build handover detail
                    let detailInput = {
                        userPK: tokenData.pk,
                        handoverPK: payload.pk,
                        dataList: payload.handoverDetails
                    }
                    HandoverDetailModel.updateMultiple(detailInput)
                        .then(detail => {
                            fulfill(payload);
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
            HandoverModel.deleteByPK(payload)
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

module.exports = new HandoverController();
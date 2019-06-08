const MaterialIOGroupModel = require('../models/materialio-group');
const MaterialIOModel = require('../models/materialio');
const { ErrorName } = require('../config/error-type');
const { decodeToke } = require('../utils/utils');

class MaterialIOGroupController {
    constructor() {
    }

    getAll() {
        return new Promise((fulfill, reject) => {
            MaterialIOGroupModel.getAll()
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
            MaterialIOGroupModel.getByPK(pk)
                .then(materialIOGroup => {
                    fulfill(materialIOGroup);
                })
                .catch(err => {
                    console.log(err);
                    reject(ErrorName.OTHER);
                })
        })
    }

    getByDataStatus(status) {
        return new Promise((fulfill, reject) => {
            MaterialIOGroupModel.getByDataStatus(status)
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
            MaterialIOGroupModel.insert(payload)
                .then(io => {
                    // build handover detail
                    let detailInput = {
                        userPK: tokenData.pk,
                        ioGroupPK: io.pk,
                        dataList: payload.materialsIO
                    }
                    MaterialIOModel.insertMultiple(detailInput)
                        .then(detail => {
                            fulfill(io);
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
            MaterialIOGroupModel.updateByPK(payload)
                .then(io => {
                    // build handover detail
                    let detailInput = {
                        userPK: tokenData.pk,
                        ioGroupPK: payload.pk,
                        dataList: payload.materialsIO
                    }
                    MaterialIOModel.updateMultiple(detailInput)
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
            MaterialIOGroupModel.deleteByPK(payload)
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

module.exports = new MaterialIOGroupController();
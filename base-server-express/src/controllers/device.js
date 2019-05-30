const DeviceModel = require('../models/device');
const { ErrorName } = require('../config/error-type');
const { decodeToke } = require('../utils/utils');

class DeviceController {
    constructor() {
    }

    getAll() {
        return new Promise((fulfill, reject) => {
            DeviceModel.getAll()
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
            DeviceModel.getByPK(pk)
                .then(device => {
                    fulfill(device);
                })
                .catch(err => {
                    console.log(err);
                    reject(ErrorName.OTHER);
                })
        })
    }

    getByDataStatus(status) {
        return new Promise((fulfill, reject) => {
            DeviceModel.getByDataStatus(status)
                .then(dataList => {
                    fulfill(dataList);
                })
                .catch(err => {
                    console.log(err);
                    reject(ErrorName.OTHER);
                })
        });
    }

    search(payload) {
        return new Promise((fulfill, reject) => {
            DeviceModel.search(payload)
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
            DeviceModel.insert(payload)
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
            DeviceModel.updateByPK(payload)
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
            DeviceModel.deleteByPK(payload)
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

module.exports = new DeviceController();
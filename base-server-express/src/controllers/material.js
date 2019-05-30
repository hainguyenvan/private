const MaterialModel = require('../models/material');
const { ErrorName } = require('../config/error-type');
const { decodeToke } = require('../utils/utils');

class AgentController {
    constructor() {
    }

    getAll() {
        return new Promise((fulfill, reject) => {
            MaterialModel.getAll()
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
            MaterialModel.getByPK(pk)
                .then(material => {
                    fulfill(material);
                })
                .catch(err => {
                    console.log(err);
                    reject(ErrorName.OTHER);
                })
        })
    }

    getInOutTotalByPK(type, pk) {
        return new Promise((fulfill, reject) => {
            if (type === undefined || type === null || type === '' || pk === undefined || pk === null || pk === '') {
                fulfill(null);
            }
            MaterialModel.getInOutTotalByPK(type, pk)
                .then(data => {
                    fulfill(data);
                })
                .catch(err => {
                    console.log(err);
                    reject(ErrorName.OTHER);
                })
        })
    }

    search(usingFor) {
        return new Promise((fulfill, reject) => {
            if (usingFor === undefined || usingFor === null || usingFor === '') {
                fulfill(null);
            }
            MaterialModel.search(usingFor)
                .then(materials => {
                    fulfill(materials);
                })
                .catch(err => {
                    console.log(err);
                    reject(ErrorName.OTHER);
                })
        })
    }

    getByDataStatus(status) {
        return new Promise((fulfill, reject) => {
            MaterialModel.getByDataStatus(status)
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
            MaterialModel.insert(payload)
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
            MaterialModel.updateByPK(payload)
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
            MaterialModel.deleteByPK(payload)
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

module.exports = new AgentController();
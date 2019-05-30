const CustomerModel = require('../models/customer');
const { ErrorName } = require('../config/error-type');
const { decodeToke } = require('../utils/utils');

class CustomerController {
    constructor() {
    }

    getAll() {
        return new Promise((fulfill, reject) => {
            CustomerModel.getAll()
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
            CustomerModel.getByPK(pk)
                .then(customer => {
                    fulfill(customer);
                })
                .catch(err => {
                    console.log(err);
                    reject(ErrorName.OTHER);
                })
        })
    }

    getByDataStatus(status) {
        return new Promise((fulfill, reject) => {
            CustomerModel.getByDataStatus(status)
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
            CustomerModel.search(payload)
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
            CustomerModel.insert(payload)
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
            CustomerModel.updateByPK(payload)
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
            CustomerModel.deleteByPK(payload)
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

module.exports = new CustomerController();
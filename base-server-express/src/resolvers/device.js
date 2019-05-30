const DeviceController = require('../controllers/device');
const DeviceModelController = require('../controllers/device-model');
const CustomerController = require('../controllers/customer');

const Device = {
    modelDetail(root) {
        let modelPK = root.modelPK;
        return DeviceModelController.getByPK(modelPK)
            .then(modelData => {
                return modelData;
            })
            .catch(err => {
                return null;
            })
    },

    customerDetail(root) {
        let customerPK = root.customerPK;
        return CustomerController.getByPK(customerPK)
            .then(modelData => {
                return modelData;
            })
            .catch(err => {
                return null;
            })
    }
}

const Query = {
    getAllDevice(root, args, context, info) {
        return DeviceController.getAll()
            .then(dataList => {
                return dataList;
            })
            .catch(errName => {
                throw new Error(errName);
            })
    },

    getByPKDevice(root, args, context, info) {
        let pk = args.pk;
        return DeviceController.getByPK(pk)
            .then(data => {
                return data;
            })
            .catch(errName => {
                throw new Error(errName);
            })
    },

    getByDataStatusDevice(root, args, context, info) {
        let dataStatus = args.dataStatus;
        return DeviceController.getByDataStatus(dataStatus)
            .then(dataList => {
                return dataList;
            })
            .catch(errName => {
                throw new Error(errName);
            })
    },

    searchDevice(root, args, context, info) {
        return DeviceController.search(args)
            .then(dataList => {
                return dataList;
            })
            .catch(errName => {
                throw new Error(errName);
            })
    }
}

const Mutation = {
    insertDevice(root, args, context, info) {
        let payload = args;
        payload.token = context.headers.token;
        return DeviceController.insert(payload)
            .then(data => {
                return data;
            })
            .catch(errName => {
                throw new Error(errName);
            })
    },

    updateDeviceByPK(root, args, context, info) {
        let payload = args;
        payload.token = context.headers.token;
        return DeviceController.updateByPK(payload)
            .then(async (data) => {
                let pk = args.pk;
                let updateData = await DeviceController.getByPK(pk)
                    .then(device => {
                        return device;
                    })
                    .catch(err => {
                        throw new Error(err);
                    });
                return updateData;
            })
            .catch(errName => {
                throw new Error(errName);
            })
    },

    deleteDeviceByPK(root, args, context, info) {
        let payload = args;
        payload.token = context.headers.token;
        return DeviceController.deleteByPK(payload)
            .then(status => {
                return status;
            })
            .catch(errName => {
                throw new Error(errName);
            })
    }
}


module.exports = {
    Query,
    Mutation,
    Device
}
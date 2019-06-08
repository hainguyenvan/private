const DeviceModelController = require('../controllers/device-model');
const CategoryController = require('../controllers/category');

const DeviceModel = {
    commonNameDetail(root) {
        let commonName = root.commonName;
        return  CategoryController.getByPK(commonName)
            .then(data => {
                return data;
            })
            .catch(err => {
                return null;
            })
    }
}

const Query = {
    getAllDeviceModel(root, args, context, info) {
        return DeviceModelController.getAll()
            .then(dataList => {
                return dataList;
            })
            .catch(errName => {
                throw new Error(errName);
            })
    },

    getByPKDeviceModel(root, args, context, info) {
        let pk = args.pk;
        return DeviceModelController.getByPK(pk)
            .then(data => {
                return data;
            })
            .catch(errName => {
                throw new Error(errName);
            })
    },

    getByDataStatusDeviceModel(root, args, context, info) {
        let dataStatus = args.dataStatus;
        return DeviceModelController.getByDataStatus(dataStatus)
            .then(dataList => {
                return dataList;
            })
            .catch(errName => {
                throw new Error(errName);
            })
    },

    searchDeviceModel(root, args, context, info) {
        return DeviceModelController.search(args)
            .then(dataList => {
                return dataList;
            })
            .catch(errName => {
                throw new Error(errName);
            })
    }
}

const Mutation = {
    insertDeviceModel(root, args, context, info) {
        let payload = args;
        payload.token = context.headers.token;
        return DeviceModelController.insert(payload)
            .then(data => {
                return data;
            })
            .catch(errName => {
                throw new Error(errName);
            })
    },

    updateDeviceModelByPK(root, args, context, info) {
        let payload = args;
        payload.token = context.headers.token;
        return DeviceModelController.updateByPK(payload)
            .then(async (data) => {
                let pk = args.pk;
                let updateData = await DeviceModelController.getByPK(pk)
                    .then(model => {
                        return model;
                    }).
                    catch(err => {
                        throw new Error(err);
                    })
                return updateData;
            })
            .catch(errName => {
                throw new Error(errName);
            })
    },

    deleteDeviceModelByPK(root, args, context, info) {
        let payload = args;
        payload.token = context.headers.token;
        return DeviceModelController.deleteByPK(payload)
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
    DeviceModel
}
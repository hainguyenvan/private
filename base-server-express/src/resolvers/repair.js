const UserController = require('../controllers/user');
const LocationController = require('../controllers/location');
const DeviceController = require('../controllers/device');
const CustomerController = require('../controllers/customer');
const RepairDetailController = require('../controllers/repair-detail');
const RepairController = require('../controllers/repair');

const Repair = {
    operatorDetail(root) {
        let operator = root.operator;
        return UserController.getByPK(operator)
            .then(detail => {
                return detail;
            })
            .catch(err => {
                return null;
            })
    },

    repairPlaceDetail(root) {
        let repairPlace = root.repairPlace;
        return LocationController.getByPK(repairPlace)
            .then(detail => {
                return detail;
            })
            .catch(err => {
                return null;
            })
    },

    deviceDetail(root) {
        let devicePK = root.devicePK;
        return DeviceController.getByPK(devicePK)
            .then(detail => {
                return detail;
            })
            .catch(err => {
                return null;
            })
    },

    customerDetail(root) {
        let customerPK = root.customerPK;
        return CustomerController.getByPK(customerPK)
            .then(detail => {
                return detail;
            })
            .catch(err => {
                return null;
            })
    },

    repairDetails(root) {
        let pk = root.pk;
        return RepairDetailController.getByRepairPK(pk)
            .then(detail => {
                return detail;
            })
            .catch(err => {
                return null;
            })
    }
}

const Query = {
    getAllRepair(root, args, context, info) {
        return RepairController.getAll()
            .then(dataList => {
                return dataList;
            })
            .catch(errName => {
                throw new Error(errName);
            })
    },

    getByPKRepair(root, args, context, info) {
        let pk = args.pk;
        return RepairController.getByPK(pk)
            .then(data => {
                return data;
            })
            .catch(errName => {
                throw new Error(errName);
            })
    },

    getByDataStatusRepair(root, args, context, info) {
        let dataStatus = args.dataStatus;
        return RepairController.getByDataStatus(dataStatus)
            .then(dataList => {
                return dataList;
            })
            .catch(errName => {
                throw new Error(errName);
            })
    }
}

const Mutation = {
    insertRepair(root, args, context, info) {
        let payload = args.input;
        payload.token = context.headers.token;
        return RepairController.insert(payload)
            .then(data => {
                return data;
            })
            .catch(errName => {
                throw new Error(errName);
            })
    },

    updateRepairByPK(root, args, context, info) {
        let payload = args.input;
        payload.token = context.headers.token;
        return RepairController.updateByPK(payload)
            .then(async (data) => {
                let pk = payload.pk;
                let updateData = await RepairController.getByPK(pk)
                    .then(repair => {
                        return repair;
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

    deleteRepairByPK(root, args, context, info) {
        let payload = args;
        payload.token = context.headers.token;
        return RepairController.deleteByPK(payload)
            .then(status => {
                return status;
            })
            .catch(errName => {
                throw new Error(errName);
            })
    },

    updateStatusRepairByPK(root, args, context, info) {
        let payload = args;
        payload.token = context.headers.token;
        return RepairController.updateStatusByPK(payload)
            .then(status => {
                return status;
            })
            .catch(errName => {
                throw new Error(errName);
            })
    },

    assignOperatorRepairByPK(root, args, context, info) {
        let payload = args;
        payload.token = context.headers.token;
        return RepairController.assignOperatorByPKRepair(payload)
            .then(status => {
                return status;
            })
            .catch(errName => {
                throw new Error(errName);
            })
    },
}


module.exports = {
    Query,
    Mutation,
    Repair
}
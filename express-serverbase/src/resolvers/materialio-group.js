const UserController = require('../controllers/user');
const MaterialIOController = require('../controllers/materialio');
const MaterialIOGroupController = require('../controllers/materialio-group');

const MaterialIOGroup = {
    ioSenderDetail(root) {
        let ioSender = root.ioSender;
        return UserController.getByPK(ioSender)
            .then(detail => {
                return detail;
            })
            .catch(err => {
                return null;
            })
    },

    ioReceiverDetail(root) {
        let ioReceiver = root.ioReceiver;
        return UserController.getByPK(ioReceiver)
            .then(detail => {
                return detail;
            })
            .catch(err => {
                return null;
            })
    },

    materialsIO(root) {
        let materialPK = root.pk;
        return MaterialIOController.getByMaterialPK(materialPK)
            .then(dataList => {
                return dataList;
            })
            .catch(err => {
                return null;
            })
    }
}

const Query = {
    getAllMaterialIOGroup(root, args, context, info) {
        return MaterialIOGroupController.getAll()
            .then(dataList => {
                return dataList;
            })
            .catch(errName => {
                throw new Error(errName);
            })
    },

    getByPKMaterialIOGroup(root, args, context, info) {
        let pk = args.pk;
        return MaterialIOGroupController.getByPK(pk)
            .then(data => {
                return data;
            })
            .catch(errName => {
                throw new Error(errName);
            })
    },

    getByDataStatusMaterialIOGroup(root, args, context, info) {
        let dataStatus = args.dataStatus;
        return MaterialIOGroupController.getByDataStatus(dataStatus)
            .then(dataList => {
                return dataList;
            })
            .catch(errName => {
                throw new Error(errName);
            })
    }
}

const Mutation = {
    insertMaterialIOGroup(root, args, context, info) {
        let payload = args.input;
        payload.token = context.headers.token;
        return MaterialIOGroupController.insert(payload)
            .then(data => {
                return data;
            })
            .catch(errName => {
                throw new Error(errName);
            })
    },

    updateMaterialIOGroupByPK(root, args, context, info) {
        let payload = args.input;
        payload.token = context.headers.token;
        return MaterialIOGroupController.updateByPK(payload)
            .then(async (data) => {
                let updateData = await MaterialIOGroupController.getByPK(payload.pk)
                    .then(io => {
                        return io;
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

    deleteMaterialIOGroupByPK(root, args, context, info) {
        let payload = args;
        payload.token = context.headers.token;
        return MaterialIOGroupController.deleteByPK(payload)
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
    MaterialIOGroup
}
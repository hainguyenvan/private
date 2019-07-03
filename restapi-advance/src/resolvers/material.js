const MaterialController = require('../controllers/material');
const CategoryController = require('../controllers/category');
const DeviceModelContoller = require('../controllers/device-model');

const Material = {
    usingForDetail(root) {
        let usingFor = root.usingFor;
        return DeviceModelContoller.getByPK(usingFor)
            .then(detail => {
                return detail;
            })
            .catch(err => {
                return null;
            })
    },
    unitDetail(root) {
        let unit = root.unit;
        return CategoryController.getByPK(unit)
            .then(detail => {
                return detail;
            })
            .catch(err => {
                return null;
            })
    },

    async ioDetail(root) {
        let pk = root.pk;
        let inTotal = await MaterialController.getInOutTotalByPK('in', pk)
            .then(total => {
                return total;
            })
            .catch(err => {
                console.log(err);
                return 0;
            })
        let outTotal = await MaterialController.getInOutTotalByPK('out', pk)
            .then(total => {
                return total;
            })
            .catch(err => {
                console.log(err);
                return 0;
            });
        let io = {
            in: inTotal,
            out: outTotal,
            remain: inTotal - outTotal

        };
        return io;
    },
}

const Query = {
    getAllMaterial(root, args, context, info) {
        return MaterialController.getAll()
            .then(dataList => {
                return dataList;
            })
            .catch(errName => {
                throw new Error(errName);
            })
    },

    getByPKMaterial(root, args, context, info) {
        let pk = args.pk;
        return MaterialController.getByPK(pk)
            .then(data => {
                return data;
            })
            .catch(errName => {
                throw new Error(errName);
            })
    },

    getByDataStatusMaterial(root, args, context, info) {
        let dataStatus = args.dataStatus;
        return MaterialController.getByDataStatus(dataStatus)
            .then(dataList => {
                return dataList;
            })
            .catch(errName => {
                throw new Error(errName);
            })
    },

    searchMaterial(root, args, context, info) {
        let payload = args;
        return MaterialController.search(payload)
            .then(dataList => {
                return dataList;
            })
            .catch(errName => {
                throw new Error(errName);
            })
    }
}

const Mutation = {
    insertMaterial(root, args, context, info) {
        let payload = args.input;
        payload.token = context.headers.token;
        return MaterialController.insert(payload)
            .then(data => {
                return data;
            })
            .catch(errName => {
                throw new Error(errName);
            })
    },

    updateMaterialByPK(root, args, context, info) {
        let payload = args.input;
        payload.token = context.headers.token;
        return MaterialController.updateByPK(payload)
            .then(async (data) => {
                let pk = payload.pk;
                let updateData = await MaterialController.getByPK(pk)
                    .then(material => {
                        return material;
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

    deleteMaterialByPK(root, args, context, info) {
        let payload = args;
        payload.token = context.headers.token;
        return MaterialController.deleteByPK(payload)
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
    Material
}
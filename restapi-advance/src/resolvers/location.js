const LocationController = require('../controllers/location');

const Query = {
    getAllLocation(root, args, context, info) {
        return LocationController.getAll()
            .then(dataList => {
                return dataList;
            })
            .catch(errName => {
                throw new Error(errName);
            })
    },

    getByPKLocation(root, args, context, info) {
        let pk = args.pk;
        return LocationController.getByPK(pk)
            .then(data => {
                return data;
            })
            .catch(errName => {
                throw new Error(errName);
            })
    },

    getByDataStatusLocation(root, args, context, info) {
        let dataStatus = args.dataStatus;
        return LocationController.getByDataStatus(dataStatus)
            .then(dataList => {
                return dataList;
            })
            .catch(errName => {
                throw new Error(errName);
            })
    },

    getHuyenByTinhLocation(root, args, context, info) {
        let codeTinh = args.codeTinh;
        return LocationController.getHuyenByTinh(codeTinh)
            .then(dataList => {
                return dataList;
            })
            .catch(errName => {
                throw new Error(errName);
            })
    },

    getXaByHuyenLocation(root, args, context, info) {
        let codeHuyen = args.codeHuyen;
        return LocationController.getXaByHuyen(codeHuyen)
            .then(dataList => {
                return dataList;
            })
            .catch(errName => {
                throw new Error(errName);
            })
    },

    getAllTinhLocation(root, args, context, info) {
        return LocationController.getAllTinh()
            .then(dataList => {
                return dataList;
            })
            .catch(errName => {
                throw new Error(errName);
            })
    },
}


module.exports = {
    Query
}
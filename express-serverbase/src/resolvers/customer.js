const CustomerController = require('../controllers/customer');
const CategoryController = require('../controllers/category');
const LocationController = require('../controllers/location');

const Customer = {
    supportRegionDetail(root) {
        let supportRegionPK = root.supportRegionPK;
        return CategoryController.getByPK(supportRegionPK)
            .then(regionData => {
                return regionData;
            })
            .catch(err => {
                return null;
            })
    },

    placeDetail(root) {
        let place = root.place;
        return LocationController.getByPK(place)
            .then(placeData => {
                return placeData;
            })
            .catch(err => {
                return null;
            })
    }
}

const Query = {
    getAllCustomer(root, args, context, info) {
        return CustomerController.getAll()
            .then(dataList => {
                return dataList;
            })
            .catch(errName => {
                throw new Error(errName);
            })
    },

    getByPKCustomer(root, args, context, info) {
        let pk = args.pk;
        return CustomerController.getByPK(pk)
            .then(data => {
                return data;
            })
            .catch(errName => {
                throw new Error(errName);
            })
    },

    getByDataStatusCustomer(root, args, context, info) {
        let dataStatus = args.dataStatus;
        return CustomerController.getByDataStatus(dataStatus)
            .then(dataList => {
                return dataList;
            })
            .catch(errName => {
                throw new Error(errName);
            })
    },

    searchCustomer(root, args, context, info) {
        return CustomerController.search(args)
            .then(dataList => {
                return dataList;
            })
            .catch(errName => {
                throw new Error(errName);
            })
    }
}

const Mutation = {
    insertCustomer(root, args, context, info) {
        let payload = args;
        payload.token = context.headers.token;
        return CustomerController.insert(payload)
            .then(data => {
                return data;
            })
            .catch(errName => {
                throw new Error(errName);
            })
    },

    updateCustomerByPK(root, args, context, info) {
        let payload = args;
        payload.token = context.headers.token;
        return CustomerController.updateByPK(payload)
            .then(data => {
                let updateData = args;
                return updateData;
            })
            .catch(errName => {
                throw new Error(errName);
            })
    },

    deleteCustomerByPK(root, args, context, info) {
        let payload = args;
        payload.token = context.headers.token;
        return CustomerController.deleteByPK(payload)
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
    Customer
}
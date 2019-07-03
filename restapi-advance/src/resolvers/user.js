const UserController = require('../controllers/user');
const CategoryController = require('../controllers/category');

const User = {
    regionDetail(root) {
        let regionPK = root.regionPK;
        return CategoryController.getByPK(regionPK)
            .then(regionData => {
                return regionData;
            })
            .catch(err => {
                return null;
            })
    }
}

const Query = {

    getByDataStatusUser(root, args, context, info) {
        let dataStatus = args.dataStatus;
        return UserController.getByDataStatus(dataStatus)
            .then(user => {
                return user;
            })
            .catch(errName => {
                throw new Error(errName);
            })
    },

    getByPKUser(root, args, context, info) {
        let pk = args.pk;
        return UserController.getByPK(pk)
            .then(user => {
                return user;
            })
            .catch(errName => {
                throw new Error(errName);
            })
    },

    getAllUser(root, args, context, info) {
        return UserController.getAll()
            .then(users => {
                return users
            })
            .catch(errName => {
                throw new Error(errName);
            })
    }
}

const Mutation = {
    insertUser(root, args, context, info) {
        let payload = args;
        payload.token = context.headers.token;
        return UserController.insert(payload)
            .then(user => {
                return user;
            })
            .catch(errName => {
                throw new Error(errName);
            })
    },

    updateUserByPK(root, args, context, info) {
        let payload = args;
        payload.token = context.headers.token;
        return UserController.updateByPK(payload)
            .then(status => {
                let updateData = args;
                return updateData;
            })
            .catch(errName => {
                throw new Error(errName);
            })
    },

    deleteUserByPK(root, args, context, info) {
        let payload = args;
        payload.token = context.headers.token;
        return UserController.deleteByPK(payload)
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
    User
}
const CategoryController = require('../controllers/category');

const Query = {
    getAllCategory(root, args, context, info) {
        return CategoryController.getAll()
            .then(dataList => {
                return dataList;
            })
            .catch(errName => {
                throw new Error(errName);
            })
    },

    getByPKCategory(root, args, context, info) {
        let pk = args.pk;
        return CategoryController.getByPK(pk)
            .then(data => {
                return data;
            })
            .catch(errName => {
                throw new Error(errName);
            })
    },

    getByDataStatusCategory(root, args, context, info) {
        let dataStatus = args.dataStatus;
        return CategoryController.getByDataStatus(dataStatus)
            .then(dataList => {
                return dataList;
            })
            .catch(errName => {
                throw new Error(errName);
            })
    },

    searchCategory(root, args, context, info) {
        return CategoryController.search(args)
            .then(dataList => {
                return dataList;
            })
            .catch(errName => {
                throw new Error(errName);
            })
    },

    getByCategoryTypeCategory(root, args, context, info) {
        let categoryType = args.categoryType;
        return CategoryController.getByCategoryType(categoryType)
            .then(dataList => {
                return dataList;
            })
            .catch(errName => {
                throw new Error(errName);
            })
    }
}

const Mutation = {
    insertCategory(root, args, context, info) {
        let payload = args;
        payload.token = context.headers.token;
        return CategoryController.insert(payload)
            .then(data => {
                return data;
            })
            .catch(errName => {
                throw new Error(errName);
            })
    },

    updateCategoryByPK(root, args, context, info) {
        let payload = args;
        payload.token = context.headers.token;
        return CategoryController.updateByPK(payload)
            .then(async (data) => {
                let updateResult = await CategoryController.getByPK(args.pk)
                    .then(category => {
                        return category
                    })
                return updateResult;
            })
            .catch(errName => {
                throw new Error(errName);
            })
    },

    deleteCategoryByPK(root, args, context, info) {
        let payload = args;
        payload.token = context.headers.token;
        return CategoryController.deleteByPK(payload)
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
    Mutation
}
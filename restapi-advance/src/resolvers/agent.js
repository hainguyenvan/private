const AgentController = require('../controllers/agent');
const CategoryController = require('../controllers/category');

const Agent = {
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
    getAllAgent(root, args, context, info) {
        return AgentController.getAll()
            .then(dataList => {
                return dataList;
            })
            .catch(errName => {
                throw new Error(errName);
            })
    },

    getByPKAgent(root, args, context, info) {
        let pk = args.pk;
        return AgentController.getByPK(pk)
            .then(data => {
                return data;
            })
            .catch(errName => {
                throw new Error(errName);
            })
    },

    getByDataStatusAgent(root, args, context, info) {
        let dataStatus = args.dataStatus;
        return AgentController.getByDataStatus(dataStatus)
            .then(dataList => {
                return dataList;
            })
            .catch(errName => {
                throw new Error(errName);
            })
    }
}

const Mutation = {
    insertAgent(root, args, context, info) {
        let payload = args;
        payload.token = context.headers.token;
        return AgentController.insert(payload)
            .then(data => {
                return data;
            })
            .catch(errName => {
                throw new Error(errName);
            })
    },

    updateAgentByPK(root, args, context, info) {
        let payload = args;
        payload.token = context.headers.token;
        return AgentController.updateByPK(payload)
            .then(data => {
                let updateData = args;
                return updateData;
            })
            .catch(errName => {
                throw new Error(errName);
            })
    },

    deleteAgentByPK(root, args, context, info) {
        let payload = args;
        payload.token = context.headers.token;
        return AgentController.deleteByPK(payload)
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
    Agent
}
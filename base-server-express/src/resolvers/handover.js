const Constant = require('../config/constant');
const LocationController = require('../controllers/location');
const CustomerController = require('../controllers/customer');
const HandoverDetailController = require('../controllers/handover-detail');
const AgentController = require('../controllers/agent');
const HandoverController = require('../controllers/handover');

const Handover = {
    handoverPlaceDetail(root) {
        let handoverPlace = root.handoverPlace;
        return LocationController.getByPK(handoverPlace)
            .then(detail => {
                return detail;
            })
            .catch(err => {
                return null;
            })
    },

    agentDetail(root) {
        let agentPK = root.agentPK;
        return AgentController.getByPK(agentPK)
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

    handoverDetails(root) {
        let pk = root.pk;
        return HandoverDetailController.getByHandoverPK(pk)
            .then(dataList => {
                return dataList;
            })
            .catch(err => {
                return null;
            })
    },

    operatorDetail(root) {
        let operator = root.operator;
        return CustomerController.getByPK(operator)
            .then(detail => {
                return detail;
            })
            .catch(err => {
                return null;
            })
    }
}

const Query = {
    getAllHandover(root, args, context, info) {
        return HandoverController.getAll()
            .then(dataList => {
                return dataList;
            })
            .catch(errName => {
                throw new Error(errName);
            })
    },

    getByPKHandover(root, args, context, info) {
        let pk = args.pk;
        return HandoverController.getByPK(pk)
            .then(data => {
                return data;
            })
            .catch(errName => {
                throw new Error(errName);
            })
    },

    getByDataStatusHandover(root, args, context, info) {
        let dataStatus = args.dataStatus;
        return HandoverController.getByDataStatus(dataStatus)
            .then(dataList => {
                return dataList;
            })
            .catch(errName => {
                throw new Error(errName);
            })
    }
}

const Mutation = {
    insertHandover(root, args, context, info) {
        let payload = args.input;
        payload.token = context.headers.token;
        return HandoverController.insert(payload)
            .then(data => {
                return data;
            })
            .catch(errName => {
                throw new Error(errName);
            })
    },

    updateHandoverByPK(root, args, context, info) {
        let payload = args.input;
        payload.token = context.headers.token;
        return HandoverController.updateByPK(payload)
            .then(async (data) => {
                let pk = payload.pk;
                let updateData = await HandoverController.getByPK(pk)
                    .then(handover => {
                        return handover;
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

    deleteHandoverByPK(root, args, context, info) {
        let payload = args;
        payload.token = context.headers.token;
        return HandoverController.deleteByPK(payload)
            .then(status => {
                return status;
            })
            .catch(errName => {
                throw new Error(errName);
            })
    }
}


module.exports = {
    Handover,
    Query,
    Mutation
}
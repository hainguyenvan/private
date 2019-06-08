const RepairDetailController = require('../controllers/repair-detail');


const Query = {
    getRepairDetailByRepairPK(root, args, context, info) {
        let repairPK = args.repairPK;
        return RepairDetailController.getByRepairPK(repairPK)
            .then(dataList => {
                return dataList;
            })
            .catch(errName => {
                throw new Error(errName);
            })
    },
}

const Mutation = {
    insertRepairDetail(root, args, context, info) {
        let payload = args;
        payload.token = context.headers.token;
        return RepairDetailController.insert(payload)
            .then(data => {
                return data;
            })
            .catch(errName => {
                throw new Error(errName);
            })
    },

    destroyRepairDetailByPK(root, args, context, info) {
        let pk = args.pk;
        return RepairDetailController.destroyByPK(pk)
            .then(status => {
                return status;
            })
            .catch(errName => {
                throw new Error(errName);
            })
    }
}


module.exports = {
    Mutation,
    Query
}
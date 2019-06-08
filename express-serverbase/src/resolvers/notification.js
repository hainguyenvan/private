const NotificationController = require('../controllers/notification');

const Query = {
    getByUserPKNotification(root, args, context, info) {
        let userPK = args.userPK;
        return NotificationController.getByUserPK(userPK)
            .then(dataList => {
                return dataList;
            })
            .catch(errName => {
                throw new Error(errName);
            })
    }
}

const Mutation = {
    updateUnreadNotiticationByPK(root, args, context, info) {
        let payload = args;
        payload.token = context.headers.token;
        return NotificationController.updateUnreadByID(payload)
            .then(data => {
                return data;
            })
            .catch(errName => {
                throw new Error(errName);
            })
    },
}


module.exports = {
    Query,
    Mutation
}
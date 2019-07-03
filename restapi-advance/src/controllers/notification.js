const NotificationModel = require('../models/notification');
const { ErrorName } = require('../config/error-type');
const { decodeToke } = require('../utils/utils');

class NotificationController {
    constructor() {
    }

    getByUserPK(userPK) {
        return new Promise((fulfill, reject) => {
            NotificationModel.getByUserPK(userPK)
                .then(dataList => {
                    // console.log('NotificationModel.getAll run here *******')
                    fulfill(dataList);
                })
                .catch(err => {
                    console.log(err);
                    reject(ErrorName.OTHER);
                })
        })
    }


    updateUnreadByID(payload) {
        let tokenData = decodeToke(payload.token);
        payload.modifiedBy = tokenData.pk;
        payload.unread = 'read';
        return new Promise((fulfill, reject) => {
            NotificationModel.updateUnreadByID(payload)
                .then(data => {
                    fulfill(data);
                })
                .catch(err => {
                    console.log(err);
                    reject(ErrorName.OTHER);
                })
        });
    }

}

module.exports = new NotificationController();
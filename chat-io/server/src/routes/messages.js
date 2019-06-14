const validate = require('express-validation');
const Joi = require('joi');

const MessagesController = require('../controllers/messages');

module.exports = function (router) {

    router.route('/messages').post(validate({
        body: {
            roomID: Joi.string().required(),
            userID: Joi.string().required(),
            content: Joi.string().required()
        }
    }), MessagesController.insert);

    router.route('/messages').get(MessagesController.getAll);
}